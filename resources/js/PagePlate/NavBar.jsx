//images
import { useContext, useEffect, useState } from "react";
import Icon from "../Utilities/Icon";
import logoDarkMode from "../../images/logo/Musifier_Logo_Dark.svg";

//React
import { Link, useNavigate } from "react-router-dom"
import { propertyExclusion } from "../helpers/ParseArgument";
import { GlobalStateContext } from "../Utilities/GlobalState";
import { authToken } from "../Utilities/Api";


export default ()=>{
    //Global
    const navigate = useNavigate();
    const [ gState, gCast] = useContext(GlobalStateContext);
    const isAuthenticated = authToken.exist;

    //useState
    const [ openLink, openLinkSet ] = useState(false); //instrument, learn, join

    //Data Structure
    const instrumentItems = <>
        <DropDownItem name="Electric Guitar" to="/inst/electricguitar" />
        <DropDownItem name="Piano" to="/inst/piano"/>
        <small className="text-slate-400">Still in Beta</small>
    </>
    const learnItems = <>
        <DropDownItem name="Essentials" to="/learn/introduction/essential" />
        <DropDownItem name="Fret Board" to="/learn/guitar/fretboard" />
        <DropDownItem name="Read Notes" to="/learn/introduction/readnotes" />
        <DropDownItem name="Learn Beats" to="/learn/introduction/learnbeats" />
        <DropDownItem name="View All" to="/learn" />
        <small className="text-slate-400">Still in Beta</small>
    </>
    const joinItems = <>
        <DropDownItem name="Login" to="/login" />
        <DropDownItem name="Sign-up" to="/signup" />
    </>
    const profileItems = <>
        <DropDownItem name="View" to="/profile" />
        <DropDownItem name="Logout" to="/logout" />
    </>

    //Use Effect For SideNav
    useEffect(()=>{
        gCast({sideNav:"content", val:<>
           <div className=" flex flex-col gap-1 mt-5">
                <div className={` basis-full p-2 rounded ${openLink=="instrument"?"bg-gray-800":"bg-gray-800/75"}`} tabIndex={0} onBlur={closeDropDownOnBlur}>
                    <NavLink open={openLink=="instrument"} name="Instruments" place="right" onClick={select("instrument")} />
                    <div className={`mt-6 ml-6 ${openLink!="instrument"&&"hidden"}`}>
                        {instrumentItems}
                    </div>
                </div>
                <div className={` basis-full p-2 rounded ${openLink=="learn"?"bg-gray-800":"bg-gray-800/75"}`} tabIndex={0}  onBlur={closeDropDownOnBlur}>
                    <NavLink open={openLink=="learn"} name="Learn" place="right" onClick={select("learn")} />
                    <div className={`mt-6 ml-6 ${openLink!="learn"&&"hidden"}`}>
                        {learnItems}
                    </div>
                </div>
                {isAuthenticated()?<>
                    <div className={` basis-full p-2 rounded ${openLink=="profile"?"bg-gray-800":"bg-gray-800/75"}`} tabIndex={0} onBlur={closeDropDownOnBlur}>
                        <NavLink open={openLink=="profile"} name="Profile" place="right" onClick={select("profile")} />
                        <div className={`mt-6 ml-6 ${openLink!="profile"&&"hidden"}`}>
                            {profileItems}
                        </div>
                    </div>
                </>:<>
                    <div className={` basis-full p-2 rounded ${openLink=="join"?"bg-gray-800":"bg-gray-800/75"}`} tabIndex={0} onBlur={closeDropDownOnBlur}>
                        <NavLink open={openLink=="join"} name="Join" place="right" onClick={select("join")} />
                        <div className={`mt-6 ml-6 ${openLink!="join"&&"hidden"}`}>
                            {joinItems}
                        </div>
                    </div>
                </>}

           </div>
        </>});
        gCast({sideNav:"full"});
    }, [openLink]);

    //Functionality
    function select(link){
        return (e)=>{
            if(openLink == link)
                navigate("/"+link);
            openLinkSet(link);
        }
    }
    function openSideNav(e){
        gCast({sideNav:"open"});
    }
    function goTo(link){
        return ()=>navigate(link);
    }
    function closeDropDownOnBlur(e){
        if(e.target.contains(e.relatedTarget))
            return e.preventDefault();

        openLinkSet(false);
    }


    return <header className="fixed z-10 w-full bg-gray-900 after:absolute after:h-[0.1rem] after:w-full after:bg-gradient-to-r after:from-sky-400 after:to-blue-500 after:drop-shadow-lg">
        <nav className=" my-4 flex gap-8 sm:justify-center items-center px-5">
            {/*Logo Container*/}
            <Link to={"/"}>
                <div className="relative w-32 h-auto">
                    <img src={logoDarkMode} alt="Homepage Brand Image" className="my-img"  />
                </div>
            </Link>
            <div className="relative sm:block hidden" tabIndex={0} onBlur={closeDropDownOnBlur}>
                <DropDown open={openLink=="instrument"}>
                    {instrumentItems}
                </DropDown>
                <NavLink open={openLink=="instrument"} name="Instruments" onClick={select("instrument")} />
            </div>
            <div className="relative sm:block hidden" tabIndex={0} onBlur={closeDropDownOnBlur}>
                <DropDown open={openLink=="learn"}>
                    {learnItems}
                </DropDown>
                <NavLink open={openLink=="learn"} name="Learn" onClick={select("learn")} />
            </div>
            {isAuthenticated()?<>
                <div className="relative sm:block hidden" tabIndex={0} onBlur={closeDropDownOnBlur}>
                    <DropDown open={openLink=="profile"}>
                        {profileItems}
                    </DropDown>
                    <NavLink open={openLink=="profile"} name="Profile" onClick={select("profile")} />
                </div>
            </>:<>
                <div className="relative sm:block hidden" tabIndex={0} onBlur={closeDropDownOnBlur}>
                    <DropDown open={openLink=="join"}>
                        {joinItems}
                    </DropDown>
                    <NavLink open={openLink=="join"} name="Join" onClick={select("join")} />
                </div>
            </>}

            <div className=" sm:hidden ml-auto" onClick={openSideNav}>
                <Icon name="hamburgerMenu" outClass="h-10 w-10" inClass="fill-slate-300" />
            </div>
        </nav>
    </header>
}


//Components
function NavLink(props){
    const {open, name, place, className, onClick} = props;
    const icon = <Icon name={open?"up":"down"} outClass="h-6 w-6" inClass="fill-slate-500"  />;

    return <div className={`flex items-center cursor-pointer ${className}`} onClick={onClick}>
        { place=="right"?icon:"" }
        <span className=" my-text-big">{name}</span>
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
        <Link className="relative group cursor-pointer flex flex-row mb-2" {...attributes}>
            <div className={` group-hover:bg-sky-500 bg-blue-900 w-1 h-[5px]"`}></div>
            <div className="ml-1 break-keep my-text" style={{whiteSpace:"nowrap"}}>{name}</div>
        </Link>
    </>
}
