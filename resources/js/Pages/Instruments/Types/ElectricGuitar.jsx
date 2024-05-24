import { Suspense, lazy, useState } from "react";
import { propertyExclusion } from "../../../helpers/ParseData";
import { LoadingInstrument, InstrumentContainer } from "../Components.jsx";


const Fretboard = lazy(()=> import("../../../Elements/ElectricGuitar/Fretboard.jsx"));
const Interactable = lazy(()=> import("../../../Elements/ElectricGuitar/Interactable.jsx"));

export function ElectricGuitarIndex(){
    return <>
        <LogicView />
    </>
}

function LogicView(){
    return <>
        <InstrumentContainer className="lg:px-10 md:px-7 sm:px-5 px-2 pb-5">
            <Header />
            <ElectricGuitarInterface />
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


export function ElectricGuitarInterface(props){
    const enableWriteMode = props.enableWriteMode ?? false;
    const getNotes = props.getNotes ?? ((x)=>true);

    //WriteMode Freeze that current you and this will able the parent component to receive a notes
    const [writeMode, writeModeSet] = useState(false);

    return <>
        <main className="xl:[110rem] lg:w-[100rem] md:w-[80rem] w-[70rem] flex justify-center">
            <Suspense fallback={<LoadingInstrument />}>
                <Fretboard>
                    <Interactable />
                </Fretboard>
            </Suspense>
        </main>
    </>
}



