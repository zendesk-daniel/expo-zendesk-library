import Ionicons from "@expo/vector-icons/Ionicons";
import React, { ComponentProps } from "react";
import { StyleSheet, Pressable, PressableProps } from "react-native";

import { useThemeColor } from "../hooks/useThemeColor";

interface IconButtonProps extends PressableProps {
  icon: ComponentProps<typeof Ionicons>["name"];
}

const IconButton = ({ icon, style, ...rest }: IconButtonProps) => {
  const primaryDark = useThemeColor({ light: "" }, "primaryDark");
  const primaryLight = useThemeColor({ light: "" }, "primaryLight");

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: !pressed ? primaryDark : primaryLight,
        },
        typeof style === "function" ? style({ pressed }) : style,
      ]}
      {...rest}
    >
      <Ionicons size={32} name={icon} style={styles.icon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    color: "white",
  },
});

export default IconButton;
