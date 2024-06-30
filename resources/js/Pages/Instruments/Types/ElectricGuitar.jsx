import { Suspense, lazy, useState } from "react";
import { propertyExclusion } from "../../../helpers/ParseData";
import { LoadingInstrument, InstrumentContainer, LoginToCreateMusic } from "../Components.jsx";
import { Container } from "../../Components.jsx";
import { authToken } from "../../../Utilities/Api.jsx";
import { Link } from "react-router-dom";


const ElectricGuitarInterface = lazy(()=> import("@/Elements/Instruments/ElectricGuitar/Interface.jsx"));

export function ElectricGuitarIndex(){
    return <>
        <LogicView />
    </>
}

function LogicView(){
    return <>
        <div className="mt-32"></div>
        <Header />
        <InstrumentContainer className="lg:px-10 md:px-7 sm:px-5 px-2 pb-5">
            <Suspense fallback={<LoadingInstrument />}>
                <ElectricGuitarInterface />
            </Suspense>
        </InstrumentContainer>
        <Container >
            <YourRecordList instrument={"Electric Guitar"}/>

        </Container>
        <div className="mt-24"></div>
    </>
}

function YourRecordList(props){
    const {instrument} = props;
    //If not login please put a if not login create to create a record using this interface
    if(!authToken.exist()){
        return <>
            <LoginToCreateMusic />
        </>
    }

    <div className=" flex justify-center">
        <button className="my-btn-big px-5 py-2">Create a Record Using This Interface</button>
    </div>
}

function Header({children, className, ...attributes}){
    return <>
        <header className={`mb-10 mt-16 ${className}`} {...attributes}>
            <h2 className=" my-header-flat text-center">Electric Guitar</h2>
            <p className=" my-text text-center">You may tap on any of the frets/strings to highlight the notes.</p>
        </header>
    </>
}


