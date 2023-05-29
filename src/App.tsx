import React, { FC } from 'react';
import { UserPreferencesProvider } from "./context/UserPreferencesContext";
import Main from "./components/Main";

const App: FC = () => {
    return (
        <UserPreferencesProvider>
            <Main/>
        </UserPreferencesProvider>
    );
}

export default App;
