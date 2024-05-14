import { createContext, useReducer } from "react";
import { sideNavDispatch, sideNavState } from "../PagePlate/SideNav";
export const GlobalStateContext = createContext();

export function GlobalState(){
    //State Container
    const state = {
        sideNav: sideNavState,
    };
    //Dispatcher
    function dispatch(state, action){
        const refState = {...state};

        if(action?.sideNav)
            refState.sideNav = sideNavDispatch(refState.sideNav, action);

        return refState;
    }
    //returner
    return useReducer(dispatch, state);
}
