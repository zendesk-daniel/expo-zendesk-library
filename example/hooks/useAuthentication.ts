import Zendesk from "expo-zendesk-library";
import { jwtDecode } from "jwt-decode";
import { useRef, useState } from "react";

const keyId = process.env.EXPO_PUBLIC_APP_ID;
const keySecret = process.env.EXPO_PUBLIC_APP_SECRET;

export const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const savedToken = useRef("");

  const getJWTToken = async () => {
    console.log("SEND PAYLOAD", { keyId, keySecret });
    const response = await fetch(
      "https://srpvsdugsf.execute-api.us-east-1.amazonaws.com/v1/generateAuthToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyId,
          keySecret,
          name: "Daniel Montes",
          email: "demo100@yopmail.com",
        }),
      },
    ).then((res) => res.json());

    console.log("RESEPONSE", response);
    savedToken.current = response.token;
    return response.token;
  };

  const login = async () => {
    try {
      if (savedToken.current) {
        const decodedToken = jwtDecode(savedToken.current);
        const isExpired = decodedToken?.exp
          ? decodedToken.exp < Date.now() / 1000
          : true;

        console.log("Token expired?", isExpired);
        if (!isExpired) {
          setIsAuthenticated(true);
          return;
        }
      }

      const token = await getJWTToken();
      console.log("Logging in with token...");
      const user = await Zendesk.login(token);
      console.log("User logged in:", user);
      setIsAuthenticated(true);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const logout = async () => {
    try {
      await Zendesk.logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  //   useEffect(() => {
  //     Zendesk.eventListener((event) => {
  //       console.log("EVENT", event);
  //     });
  //   }, []);

  return { isAuthenticated, login, logout };
};
