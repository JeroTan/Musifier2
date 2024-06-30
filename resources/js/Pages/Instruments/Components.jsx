import { Link } from "react-router-dom";

export function LoadingInstrument(){
    return <>
        <div className="w-full rounded py-10 bg-gray-900">
            <h1 className=" text-center my-title">Loading Instrument Interface</h1>
            <p className=" my-subtext text-center text-slate-400">Please wait for a while. . .</p>
        </div>
    </>
}
export function InstrumentContainer(props){
    const {children, className, ...attributes} = props;

    return <>
    <div className={`w-full relative flex justify-center`}>
        <main style={{flexBasis: "110rem", overflowY:"auto"}} className={` custom-scroll-horizontal ${className||""}`} {...attributes}>
            {children}
        </main>
    </div>
    </>
}

export function LoginToCreateMusic(){
    return <>
    <div className="flex justify-center">
        <div className="bg-gray-700 rounded border border-gray-400 mx-2 p-4 text-center">
            <h1 className=" my-text-big text-blue-300 ">Want to create your own record?</h1>
            <p ><Link to={'/login'} className=" bg-blue-400 text-slate-100 px-2 rounded pb-1">Sign-up</Link> now today and start making a list of melodies.</p>
        </div>
    </div>
    </>
}
