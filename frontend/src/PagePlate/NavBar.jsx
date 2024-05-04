//images
import { useContext, useEffect, useState } from "react";
import Icon from "../Utilities/Icon";
import logoDarkMode from "../images/logo/Musifier_Logo_Dark.svg";

//React
import { Link, useNavigate } from "react-router-dom"
import { propertyExclusion } from "../../helpers/ParseArgument";
import { GlobalStateContext } from "../Utilities/GlobalState";


export default ()=>{
    //Global
    const navigate = useNavigate();
    const [ globalState, globalCast] = useContext(GlobalStateContext);

    //useState
    const [ openLink, openLinkSet ] = useState(false); //instrument, learn, join 

    //Use Effect
    useEffect(()=>{
        globalCast({sideNav:"content", val:<>
           <div className=" flex flex-col gap-1 mt-5">
                <div className={` basis-full p-2 rounded ${openLink=="instrument"?"bg-gray-800":"bg-gray-800/75"}`} 
                    tabIndex={0} onClick={select("instrument")} onBlur={()=>openLinkSet(false)}>
                    <NavLink open={openLink=="instrument"} name="Instruments" place="right" />
                    <div className={`mt-6 ml-6 ${openLink!="instrument"&&"hidden"}`}>
                        <DropDownItem name="Electric Guitar" />
                        <DropDownItem name="Piano" />
                        <small className="text-slate-400">Still in Beta</small>
                    </div>
                </div>
                <div className={` basis-full p-2 rounded ${openLink=="learn"?"bg-gray-800":"bg-gray-800/75"}`} 
                    tabIndex={0} onClick={select("learn")} onBlur={()=>openLinkSet(false)}>
                    <NavLink open={openLink=="learn"} name="Learn" place="right" />
                    <div className={`mt-6 ml-6 ${openLink!="learn"&&"hidden"}`}>
                        <DropDownItem name="Essentials" />
                        <DropDownItem name="Fret Board" />
                        <DropDownItem name="Read Notes" />
                        <DropDownItem name="Learn Beats" />
                        <DropDownItem name="View All" />
                        <small className="text-slate-400">Still in Beta</small>
                    </div>
                </div>
                <div className={` basis-full p-2 rounded ${openLink=="join"?"bg-gray-800":"bg-gray-800/75"}`} 
                    tabIndex={0} onClick={select("join")} onBlur={()=>openLinkSet(false)}>
                    <NavLink open={openLink=="join"} name="Join" place="right" />
                    <div className={`mt-6 ml-6 ${openLink!="join"&&"hidden"}`}>
                        <DropDownItem name="Login" />
                        <DropDownItem name="Sign-up" />
                        <small className="text-slate-400">Still in Beta</small>
                    </div>
                </div>
           </div>
        </>});
        globalCast({sideNav:"full"});
    }, [openLink]);

    //Functionality
    function select(link){
        return (e)=>{
            if(openLink == link)
                navigate("/");
            openLinkSet(link);
        }
    }

    function openSideNav(){
        globalCast({sideNav:"open"});
    }


    return <header className="fixed z-10 w-full bg-gray-900 after:absolute after:h-[0.1rem] after:w-full after:bg-gradient-to-r after:from-sky-400 after:to-blue-500 after:drop-shadow-lg">
        <nav className=" my-5 flex gap-8 sm:justify-center items-center px-5">
            {/*Logo Container*/}
            <Link to={"/"}>
                <div className="relative w-32 h-auto">
                    <img src={logoDarkMode} alt="Homepage Brand Image" className="my-img"  />
                </div>
            </Link>
            <div className="relative sm:block hidden" tabIndex={0} onClick={select("instrument")} onBlur={()=>openLinkSet(false)}>
                <DropDown open={openLink=="instrument"}>
                    <DropDownItem name="Electric Guitar" />
                    <DropDownItem name="Piano" />
                    <small className="text-slate-400">Still in Beta</small>
                </DropDown>
                <NavLink open={openLink=="instrument"} name="Instruments" />
            </div>
            <div className="relative sm:block hidden" tabIndex={0} onClick={select("learn")} onBlur={()=>openLinkSet(false)}>
                <DropDown open={openLink=="learn"}>
                    <DropDownItem name="Essentials" />
                    <DropDownItem name="Fret Board" />
                    <DropDownItem name="Read Notes" />
                    <DropDownItem name="Learn Beats" />
                    <DropDownItem name="View All" />
                    <small className="text-slate-400">Still in Beta</small>
                </DropDown>
                <NavLink open={openLink=="learn"} name="Learn" />
            </div>
            <div className="relative sm:block hidden" tabIndex={0} onClick={select("join")} onBlur={()=>openLinkSet(false)}>
                <DropDown open={openLink=="join"}>
                    <DropDownItem name="Login" />
                    <DropDownItem name="Sign-up" />
                </DropDown>
                <NavLink open={openLink=="join"} name="Join" />
            </div>
            <div className=" sm:hidden ml-auto" tabIndex={0} onClick={openSideNav}>
                <Icon name="hamburgerMenu" outClass="h-10 w-10" inClass="fill-slate-300" />
            </div>
        </nav>
    </header>
}

function NavLink(props){
    const {open, name, place, className, onClick} = props;
    const icon = <Icon name={open?"up":"down"} outClass="h-6 w-6" inClass="fill-slate-500"  />;

    return <div className={`flex items-center cursor-pointer ${className}`} onClick={onClick}>
        { place=="right"?icon:"" }
        <span className="text-xl font-semibold tracking-wide">{name}</span>
        { place!="right"?icon:"" }
    </div>
}

function DropDown(props){
    const {open, children} = props;

    return <>
        <div className={` ${open?"absolute":"hidden"} w-fit z-20 left-[50%] translate-x-[-50%] rounded-b-lg md:px-4 px-2 pt-5 pb-2 top-full bg-gray-900 `}>
            {children}
        </div>
    </>
}

function DropDownItem(props){
    const {name} = props;
    const attributes = propertyExclusion(["name"], props);
    return <>
        <div className="group cursor-pointer flex flex-row mb-2" {...attributes}>
            <div className={` group-hover:bg-sky-500 bg-blue-900 w-1 h-[5px]"`}></div>
            <div className="ml-1 break-keep" style={{whiteSpace:"nowrap"}}>{name}</div>
        </div>
    </>
}