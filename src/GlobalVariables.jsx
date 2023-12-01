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
        }, 2000);
    }

    const contextData = {
        alert,
        showAlert,
        loadingNotes,
        setLoadingNotes,
        AlertDialog
    }
    return (
        <GlobalVarContext.Provider value={contextData}>
            {children}
        </GlobalVarContext.Provider>
    );

}


export function AlertDialog(props) {
    const type={
        danger:"pink",
        sucess:"#06d6a0",
        warning:"yellow",
        info:"blue"
    }
    const alertStyle = {
        backgroundColor: type[props.type],
        padding: "1px 20px",
        margin: "10px 20px",
        fontWeight: "bold",
        borderRadius: "20px",
        fontSize: "18px"
    }
    return (
        <div style={alertStyle}>
            <p>{props.msg}</p>
        </div>
    )
}



