import { useMemo, useReducer } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import SideNav from "./SideNav";

export default (props)=>{
    //Structure
    const children = props.children;
    const clean = props.clean ?? false;

    //Component
    const navbar = useMemo( ()=>!clean && <NavBar /> , [clean] );
    const footer = useMemo( ()=>!clean && <Footer /> , [clean] );
    const sideNav = useMemo( ()=>!clean && <SideNav /> , [clean] );

    return <main className="relative min-h-screen flex flex-col bg-gray-800 text-slate-300">
        {navbar}
my-backdrop
        {/* The body of the page */}
        <main className="relative grow">
            {children}
        </main>
        {/* The body of the page */}

        {footer}
        {sideNav}
    </main>
}