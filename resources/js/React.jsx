import React from "react";
import ReactDOM from "react-dom/client";
import './Utilities/React.css';
import {GlobalState, GlobalStateContext } from "./Utilities/GlobalState";
import Routing from "./PagePlate/Routing";
import { PopComponent } from "./Utilities/ReactPop";
import { NotifComponent } from "./Utilities/ReactNotif";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(<>
    <Application/>
</>);


function Application(){
    return <>
    <React.StrictMode>
        <GlobalStateContext.Provider value={GlobalState()}>
            <GoogleOAuthProvider clientId="10406787598-umd9uaoon8gi9etfgmboqspb0f973sf5.apps.googleusercontent.com">
                <Routing />
                <NotifComponent />
                <PopComponent />
            </GoogleOAuthProvider>
        </GlobalStateContext.Provider>
    </React.StrictMode>
    </>
}
