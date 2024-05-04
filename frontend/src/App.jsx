import React from "react";
import "./App.css";
import Routing from "./PagePlate/Routing";
import GlobalState, { GlobalStateContext } from "./Utilities/GlobalState";

export default ()=>{
    return <React.StrictMode>
        <GlobalStateContext.Provider value={GlobalState()}>
            <Routing />
        </GlobalStateContext.Provider>
    </React.StrictMode>
}