import React, { useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { Stack } from "expo-router";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

import { ThemeProvider } from "../themes/themeContext";

type ThemeMode = "light" | "dark" | "system";

export default function RootLayout() {
  const systemScheme = useColorScheme(); // "light" | "dark"
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const resolvedMode: "light" | "dark" =
    themeMode === "system"
      ? (systemScheme as "light" | "dark") || "light"
      : themeMode;

  return (
    <ThemeProvider mode={resolvedMode} setMode={setThemeMode}>
      <StatusBar
        barStyle={resolvedMode === "dark" ? "light-content" : "dark-content"}
        backgroundColor={resolvedMode === "dark" ? "#000" : "#fff"}
      />
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
