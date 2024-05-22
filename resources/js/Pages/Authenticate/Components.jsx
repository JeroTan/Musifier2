import { useMemo, useState } from "react";
import { capitalFirst, propertyExclusion } from "../../helpers/ParseArgument";
import PagePlate from "../../PagePlate/PagePlate";
import logoDarkMode from "../../../images/logo/Musifier_Logo_Dark.svg";
import { Link, useNavigate } from "react-router-dom";

export default ()=>{

}


export function MainPage(props){
    const {children, background} = props;

    return <>
    <PagePlate clean={true}>
        <main className={` bg-gray-900 w-full h-screen flex justify-center items-center bg-blend-overlay bg-opacity-[0.9] bg-center bg-cover bg-local`}
        style={{backgroundImage: `url(${background})`}}>
            <main className=" relative w-full h-screen bg-gradient-to-tr from-gray-900 from-20% to-gray-900/75 px-2 flex justify-center items-center">
                <div className="relative grow flex-1">

                    <div className="flex justify-center">
                        {children}
                    </div>

                    <div className="relative basis-full mb-2">
                        <LogoTag />
                    </div>

                </div>
            </main>
        </main>
    </PagePlate>
    </>
}

export function Form(props){
    const {children} = props;
    const attributes = propertyExclusion(["children"], props);

    return <>
        <form className=" rounded-lg bg-gradient-to-r from-gray-800/25 to-gray-800 md:px-4 px-2 py-2  basis-96 a-slide-in-top" {...attributes} >
            {children}
        </form>
    </>
}

export function LogoTag(){
    return <>
        <div className="w-full flex justify-center" >
            <Link className="flex flex-col justify-center items-center" to="/">
                <div className="relative h-fit mt-5 hover:scale-105" style={{width: "9.3rem"}}>
                    <img src={logoDarkMode} alt="Musifier Logo" className=" my-img" />
                </div>
                <small className="my-subtext text-slate-400 ">Play the music you love</small>
            </Link>

        </div>
    </>
}


