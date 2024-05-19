import { cloneElement, useEffect, useRef } from "react";
import { ElementResolver, copyChildren } from "../Utilities/ReactParse";

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
        <div className="">
            <div>
                {name}
            </div>
            <div>
                {description}
            </div>
        </div>
    </>

}
