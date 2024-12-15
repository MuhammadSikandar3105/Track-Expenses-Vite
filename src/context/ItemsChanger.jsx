import { createContext, useState } from "react";
import { useLocalStorage } from "../hooks/UseLocalStorage";

export const ContextProvider = createContext()
export const EditingContext = createContext()

export const Provider = ({ children }) => {
    const [items, setItems] = useLocalStorage('items', [])
    const [isEditing, setIsEditing] = useLocalStorage('isEditing','')

    return (
        <>
            <ContextProvider.Provider value={[items, setItems]}>
                <EditingContext.Provider value={[isEditing, setIsEditing]}>
                    {children}
                </EditingContext.Provider>
            </ContextProvider.Provider>
        </>
    )
}