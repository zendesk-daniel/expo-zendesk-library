import ExpoModulesCore

import ZendeskSDKMessaging
import ZendeskSDK

public class ExpoZendeskLibraryModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoZendeskLibrary")

    AsyncFunction("initialize") { (channelKey: String, promise: Promise) in
      Zendesk.initialize(withChannelKey: channelKey, messagingFactory: DefaultMessagingFactory()) { result in
        switch result {
          case .success:
              promise.resolve("Messaging initialized successfully.")
          case .failure(let error):
              promise.reject("INITIALIZATION_ERROR", error.localizedDescription)
        }
      }
    }

    AsyncFunction("login") { (jwt: String, promise: Promise) in
      Zendesk.instance?.loginUser(with: jwt) { result in
        switch result {
          case .success(let user):
            promise.resolve([
              "id": user.id,
              "externalId": user.externalId
            ])
          case .failure(let error):
            promise.reject("LOGIN_ERROR", error.localizedDescription)
        }
      }
    }

    AsyncFunction("logout") { (promise: Promise) in
      Zendesk.instance?.logoutUser { result in
        switch result {
          case .success(_):
            promise.resolve(nil)
          case .failure(let error):
            promise.reject("LOGOUT_ERROR", error.localizedDescription)
        }
      }
    }

    Function("showConversation") { () -> Void in
      DispatchQueue.main.async {
        guard let messagingViewController = Zendesk.instance?.messaging?.messagingViewController() else {
          print("Failed to get Zendesk messaging view controller.")
          return
        }

        guard let currentViewController = self.appContext?.utilities?.currentViewController() else {
          print("Failed to get the current view controller from appContext.")
          return
        }

        currentViewController.present(messagingViewController, animated: true, completion: nil)
      }
    }
  }
}
