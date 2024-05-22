import { cloneElement, useEffect, useRef, useState } from "react";
import { ElementResolver, copyChildren } from "../Utilities/ReactParse";
import { capitalFirst, propertyExclusion } from "../helpers/ParseData";

export function HrLine({children}){
    return <>
        <div className=" flex items-center gap-2">
            <div className="bg-gray-500/50 basis-full" style={{height:"1px"}}></div>
            <p className="text-gray-500">{children}</p>
            <div className="bg-gray-500/50 basis-full" style={{height:"1px"}}></div>
        </div>
    </>
}


export function ListingView(props){
    //Global
    const {children} = props;
    const viewType = props.viewType ?? "wide";

    //UseState


    //Clone children to allow self modification
    const newChildren = copyChildren(children, {viewType:viewType});

    return <>
        <main className=" w-full flex flex-wrap gap-2">
            {newChildren}
        </main>
    </>
}

export function ListingItem(props){
    const {name, description, viewType} = props;

    return <>
        <div className={` ${viewType!="wide"&&"w-full"} p-2 rounded bg-gray-900/50 hover:bg-gray-700 cursor-pointer  `}>
            <div className=" my-text-big">
                {name}
            </div>
            <div className=" my-subtext text-slate-400">
                {description}
            </div>
        </div>
    </>
}


export function Container(props){
    const children = props.children;
    const attributes = propertyExclusion(["children"], props);

    return <>
    <div className="w-full pt-16 relative flex justify-center">
        <main style={{flexBasis: "70rem"}} {...attributes}>
            {children}
        </main>
    </div>
    </>
}


//FORM
export function InputBox(props){
    const {fieldName, error, className, children, onInput, outClass, canSelfSet } = props;//This class is non-attributes
    const displayName = props.displayName ?? capitalFirst(fieldName);//If displayName is not provided then field name will be used instead
    const attributes = propertyExclusion(["fieldName", "error", "displayName", "id", "className", "children", "onInput", "key", "outClass", "canSelfSet"], props);

    return <>
        <div className={` ${outClass || "flex flex-wrap mb-3"} `}>
            <label htmlFor={fieldName} className=" my-subtext">{displayName}</label>
            <InputBar name={fieldName} className={className} onInput={onInput} error={error} canSelfSet={canSelfSet} {...attributes} />
            <small className="my-infotext text-red-400">{error}</small>
            {children}
        </div>
    </>
}

export function InputBar(props){
    const { onInput } = props;
    const className = props.className ?? "";
    const error = props.error ?? "";
    const canSelfSet = props.canSelfSet ?? true; //Set whether the logic from onInput will still pass the set and state since it will automatically set the data;
    const attributes = propertyExclusion([ "error", "id", "className", "children", "onInput", "key", "canSelfSet"], props);

    //InputState
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
        <input className={` my-textbox ${className} ${error && "my-errorbox"}`} value={inputState} onInput={onInputRevise} {...attributes} />
    </>
}
