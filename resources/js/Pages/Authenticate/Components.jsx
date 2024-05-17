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

export function InputBox(props){
    const {fieldName, error, className, children, onInput, outClass } = props;//This class is non-attributes
    const displayName = props.displayName ?? capitalFirst(fieldName);//If displayName is not provided then field name will be used instead
    const canSelfSet = props.canSelfSet ?? true; //Set whether the logic from onInput will still pass the set and state since it will automatically set the data;
    const attributes = propertyExclusion(["fieldName", "error", "displayName", "id", "className", "children", "onInput", "key", "outClass", "canSelfSet"], props);

    const [ inputState, inputSet ] = useState("");

    //Function
    function onInputRevise(e){//To insert a callback outside of this inputBox
        if(!onInput)
            return inputSet(e.target.value);


        if(canSelfSet){
            onInput(e);
            return inputSet(e.target.value);
        }

        onInput(e, inputState, inputSet);
    }

    return <>
        <div className={` ${outClass || "flex flex-wrap mb-3"} `}>
            <label htmlFor={fieldName} className=" my-subtext">{displayName}</label>
            <input id={fieldName} name={fieldName} className={` my-textbox ${className} ${error && "my-errorbox"}`} value={inputState} onInput={onInputRevise} {...attributes} />
            <small className="my-infotext text-red-400">{error}</small>
            {children}
        </div>
    </>
}
