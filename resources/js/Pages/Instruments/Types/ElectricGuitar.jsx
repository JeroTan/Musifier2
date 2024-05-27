import { Suspense, lazy, useState } from "react";
import { propertyExclusion } from "../../../helpers/ParseData";
import { LoadingInstrument, InstrumentContainer } from "../Components.jsx";


const ElectricGuitarInterface = lazy(()=> import("@/Elements/Instruments/ElectricGuitar/Interface.jsx"));

export function ElectricGuitarIndex(){
    return <>
        <LogicView />
    </>
}

function LogicView(){
    return <>
        <InstrumentContainer className="lg:px-10 md:px-7 sm:px-5 px-2 pb-5">
            <Header />
            <Suspense fallback={<LoadingInstrument />}>
                <ElectricGuitarInterface />
            </Suspense>
        </InstrumentContainer>
    </>
}
function Header(){
    return <>
        <header className=" mb-10 mt-16">
            <h2 className=" my-header-flat text-center">Electric Guitar</h2>
            <p className=" my-text text-center">You may tap on any of the frets/strings to highlight the notes.</p>
        </header>

    </>
}


