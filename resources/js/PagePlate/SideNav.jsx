import { useContext } from "react";
import { GlobalStateContext } from "../Utilities/GlobalState";
import Icon from "../Utilities/Icon";

export default (props)=>{
    const [GlobalState, globalCast] = useContext(GlobalStateContext);
    const { isOpen, content, full } = GlobalState.sideNav;

    if(!isOpen)
        return "";
 
    return <>
    <aside className={` z-50 fixed h-screen w-full my-backdrop`}>
        <main className={` p-5 ${full?"w-full":"w-96"} h-screen bg-gray-950 SlideFromRight ml-auto`} >

            <div className="flex justify-end hover:brightness-105 cursor-pointer" onClick={()=>globalCast({sideNav:"close"})}>
                <Icon name="close" inClass=" fill-blue-500" outClass="w-8 w-8" />
            </div>

            {content}

        </main>
    </aside>
    </>
}

//SideNav Properties
export const sideNavState = {
    isOpen: false,
    content: <></>,
    full: false,
};

export const sideNavDispatch = (state, action)=>{
    const refState = {...state};
    switch(action?.sideNav){
        case "open": 
            refState.isOpen = true;
        break;
        case "close":
            refState.isOpen = false;
        break;
        case "content":
            refState.content = action.val;
        break;
        case "full":
            refState.full = true;
        break;
        case "half":
            refState.half = false;
        break;
        case "navbar":
            refState.full = true;
            refState.isOpen = true;
        break;
    }
    return {...refState};
};


