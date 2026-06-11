import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightTheme, darkTheme } from "../constants/Theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState("system");

  useEffect(() => {
    const loadThemeMode = async () => {
      try {
        const savedMode = await AsyncStorage.getItem("themeMode");
        if (savedMode) {
          setThemeMode(savedMode);
        }
      } catch (error) {
        console.error("Failed to load theme mode:", error);
      }
    };
    loadThemeMode();
  }, []);

  const changeThemeMode = async (mode) => {
    try {
      setThemeMode(mode);
      await AsyncStorage.setItem("themeMode", mode);
    } catch (error) {
      console.error("Failed to save theme mode:", error);
    }
  };

  const isDark =
    themeMode === "system"
      ? systemColorScheme === "dark"
      : themeMode === "dark";

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider
      value={{ theme, isDark, themeMode, changeThemeMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
