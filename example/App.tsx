import Zendesk from "expo-zendesk-library";
import { useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";

import IconButton from "./components/IconButton";
import { useNotifications } from "./hooks/useNotifications";

const IOS_CHANNEL_KEY = process.env.EXPO_PUBLIC_ZENDESK_IOS_CHANNEL_KEY;
const ANDROID_CHANNEL_KEY = process.env.EXPO_PUBLIC_ZENDESK_ANDROID_CHANNEL_KEY;

export default function App() {
  const token = useNotifications();

  const initializeZendesk = async () => {
    try {
      await Zendesk.initialize(
        Platform.OS === "ios" ? IOS_CHANNEL_KEY : ANDROID_CHANNEL_KEY,
      );
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const handleOpentChat = () => {
    Zendesk.showConversation();
  };

  useEffect(() => {
    initializeZendesk();
  }, []);

  useEffect(() => {
    if (token) Zendesk.setPushNotificaitonToken(token);
  }, [token]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Zendesk Library</Text>
      <IconButton
        icon="chatbox"
        onPress={handleOpentChat}
        style={styles.chatButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chatButton: {
    position: "absolute",
    bottom: 64,
    right: 12,
  },
});
