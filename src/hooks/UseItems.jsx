import { useContext } from "react";
import { ContextProvider } from "../context/ItemsChanger";

export const useItems = () => useContext(ContextProvider);