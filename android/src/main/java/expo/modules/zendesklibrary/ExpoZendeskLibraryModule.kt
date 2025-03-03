package expo.modules.zendesklibrary

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise

import zendesk.android.Zendesk;
import zendesk.messaging.android.DefaultMessagingFactory;
import zendesk.messaging.android.push.PushNotifications

class ExpoZendeskLibraryModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoZendeskLibrary")

    Function("showConversation") {    
      Zendesk.instance.messaging.showMessaging(currentActivity)
    }

    Function("setPushNotificaitonToken") { token: String ->
      PushNotifications.updatePushNotificationToken(token)
    }

    AsyncFunction("initialize")  { channelKey: String, promise: Promise ->
      Zendesk.initialize(
        context = reactContext,
        channelKey,
        successCallback = { _ ->
            promise.resolve(null)
        },
        failureCallback = { error ->
            promise.reject("INITIALIZATION_ERROR", "Zendesk initialization failed", error)
        },
        messagingFactory = DefaultMessagingFactory()
      )
    }
  }

  private val reactContext
    get() = appContext.reactContext ?: throw IllegalStateException("React context is not available")

  private val currentActivity
    get() = appContext.currentActivity ?: throw IllegalStateException("Current activity is not available")
}
