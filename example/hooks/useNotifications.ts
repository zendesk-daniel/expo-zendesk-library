import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";

const TOPIC = "ZENDESK_SCREWFIX";

export const useNotifications = () => {
  const [token, setToken] = useState<string | null>(null);

  const setInitialSettings = async () => {
    await requestPermissions();
    const token = await getFCMToken();
    setToken(token);
  };

  useEffect(() => {
    if (!token) return;

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("Foreground Notification:", remoteMessage);
    });

    return unsubscribe;
  }, [token]);

  useEffect(() => {
    setInitialSettings();
  }, []);

  return token;
};

async function requestPermissions() {
  const settings = await Notifications.requestPermissionsAsync();

  console.log("Notification Permissions:", settings);

  if (settings.granted) {
    console.log("suscribed to topic");
    try {
      await subscribeToTopic();
    } catch (error) {
      console.log("error", error);
    }
  }
}

async function subscribeToTopic() {
  await messaging().subscribeToTopic(TOPIC);
}

async function getFCMToken() {
  try {
    const token = await messaging().getToken();
    return token;
  } catch (error) {
    console.log("Error getting FCM token", error);
    return null;
  }
}
