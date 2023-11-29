import { createContext, useState } from "react";

const GlobalVarContext = createContext()
export default GlobalVarContext;

export const GlobalVarProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);
    const [loadingNotes, setLoadingNotes] = useState(0);
    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    }

    const contextData = {
        alert,
        showAlert,
        loadingNotes,
        setLoadingNotes
    }
    return (
        <GlobalVarContext.Provider value={contextData}>
            {children}
        </GlobalVarContext.Provider>
    );

}