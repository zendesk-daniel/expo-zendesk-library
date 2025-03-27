import { NativeModule, requireNativeModule } from "expo";

import { ExpoZendeskLibraryModuleEvents } from "./ExpoZendeskLibrary.types";

declare class ExpoZendeskLibaryModule extends NativeModule<ExpoZendeskLibraryModuleEvents> {
  initialize: (channelKey: string) => Promise<void>;
  showConversation: () => void;
  setPushNotificaitonToken: (token: string) => void;
  login: (jwtToken: string) => Promise<void>;
  logout: () => Promise<void>;
  eventListener: (callback: (event: string) => void) => void;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoZendeskLibaryModule>(
  "ExpoZendeskLibrary",
);
