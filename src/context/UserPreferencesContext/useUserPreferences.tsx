import { useContext } from "react";
import { UserPreferencesContext, UserPreferencesContextType } from "./UserPreferencesContext";

export const useUserPreferences = () =>{
    return useContext(UserPreferencesContext) as UserPreferencesContextType;
}