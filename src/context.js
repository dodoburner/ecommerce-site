import { createContext } from "react";

const context = createContext(true);
export const ContextProvider = context.Provider;
export const ContextConsumer = context.Consumer;

export default context;
