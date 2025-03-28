import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Appearance, useColorScheme } from "react-native";
import { Platform } from "react-native";
import { lightTheme, darkTheme, iosDarkTheme } from "../constants/theme";

export type Theme = typeof lightTheme;

const ThemeContext = createContext<{
    theme: Theme;
    mode: "light" | "dark";
    setMode: (mode: "light" | "dark") => void;
}>({
    theme: lightTheme,
    mode: "light",
    setMode: () => {},
});

const getPreferredTheme = (colorScheme: "light" | "dark" | null | undefined) => {
    console.log(colorScheme);
    if (colorScheme === "dark") {
        if (Platform.OS === "ios") {
            return iosDarkTheme;
        }

        return darkTheme;
    }

    return lightTheme;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<"light" | "dark">(() => {
        const sys = Appearance.getColorScheme();
        return sys === "dark" ? "dark" : "light";
    });

    // ⏱️ Écoute les changements système (mode clair/sombre)
    useEffect(() => {
        const sub = Appearance.addChangeListener(({ colorScheme }) => {
            if (colorScheme === "dark" || colorScheme === "light") {
                setMode(colorScheme);
            }
        });

        return () => sub.remove();
    }, []);

    const theme = useMemo(() => {
        return getPreferredTheme(mode);
    }, [mode]);

    return (
        <ThemeContext.Provider value={{ theme, mode, setMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
