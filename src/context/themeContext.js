import { createContext } from "react";

export const themes = {
    light: {
        class: 'light',
        status: true
    },
    dark: {
        class: 'dark',
        status: false
    },
};

export const ThemeContext = createContext({
    theme: themes.dark,
    toggleTheme: () => {},
});

ThemeContext.displayName = 'ThemeContext'