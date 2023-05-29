import React, { createContext, FC, ReactNode, useEffect, useState } from 'react';
import throttle from "lodash/throttle";
import { THEME } from "../../shared/types";

export interface UserPreferencesContextType {
    windowWidth: number,
    windowHeight: number,
    deviceType: string,
    theme: THEME,
    switchTheme: () => void;
}

export const UserPreferencesContext = createContext<UserPreferencesContextType | null>(null);

const THROTTLE_WAIT = 400;

interface UserPreferencesProviderProps {
    children: ReactNode;
}

export const UserPreferencesProvider: FC<UserPreferencesProviderProps> = ({ children }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [theme, setTheme] = useState(THEME.LIGHT);

    useEffect(() => {
        window.addEventListener("resize", throttledResizeHandler);

        return () => {
            window.removeEventListener("resize", throttledResizeHandler);
        }
    }, []);

    const resizeHandler = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    }

    const throttledResizeHandler = throttle(resizeHandler, THROTTLE_WAIT);

    const switchTheme = () => {
        if (theme === THEME.LIGHT) {
            setTheme(THEME.DARK);
        } else {
            setTheme(THEME.LIGHT);
        }
    }

    return (
        <UserPreferencesContext.Provider
            value={{
                windowWidth,
                windowHeight,
                deviceType: navigator.userAgent,
                theme,
                switchTheme,
            }}>
            {children}
        </UserPreferencesContext.Provider>
    );
};
