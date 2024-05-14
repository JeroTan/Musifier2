import React from "react";
import ReactDOM from "react-dom/client";
import './Utilities/React.css';
import {GlobalState, GlobalStateContext } from "./Utilities/GlobalState";
import Routing from "./PagePlate/Routing";

ReactDOM.createRoot(document.getElementById("root")).render(<>
    <Application/>
</>);


function Application(){
    return <>
    <React.StrictMode>
        <GlobalStateContext.Provider value={GlobalState()}>
            <Routing />
        </GlobalStateContext.Provider>
    </React.StrictMode>
    </>
}
