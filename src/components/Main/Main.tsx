import React, { FC } from 'react';
import {
    useUserPreferences
} from "../../context/UserPreferencesContext";

const Main: FC = () => {
    const {
        windowWidth,
        windowHeight,
        deviceType,
        theme,
        switchTheme
    } = useUserPreferences();

    return (
        <div>
            <p><strong>Window width:</strong> {windowWidth}</p>
            <p><strong>Window height:</strong> {windowHeight}</p>
            <p><strong>Device type:</strong> {deviceType}</p>
            <p><strong>Application theme:</strong> {theme}</p>
            <button onClick={() => switchTheme()}>Change theme</button>
        </div>
    );
};

export default Main;