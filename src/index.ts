// Reexport the native module. On web, it will be resolved to ExpoZendeskLibraryModule.web.ts
// and on native platforms to ExpoZendeskLibraryModule.ts
import { default as Zendesk } from "./ExpoZendeskLibraryModule";
export * from "./ExpoZendeskLibrary.types";
export default Zendesk;
