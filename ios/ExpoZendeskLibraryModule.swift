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
