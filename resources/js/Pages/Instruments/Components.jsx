export function LoadingInstrument(){
    return <>
        <div className="w-full rounded py-10 bg-gray-900">
            <h1 className=" text-center my-title">Loading Instrument Interface</h1>
            <p className=" my-subtext text-center text-slate-400">Please wait for a while. . .</p>
        </div>
    </>
}
export function InstrumentContainer(props){
    const {children, className, noMargin=false, ...attributes} = props;

    return <>
    <div className={`w-full ${!noMargin?"pt-16":""} relative flex justify-center`}>
        <main style={{flexBasis: "110rem", overflowY:"auto"}} className={` custom-scroll-horizontal ${className||""}`} {...attributes}>
            {children}
        </main>
    </div>
    </>
}
