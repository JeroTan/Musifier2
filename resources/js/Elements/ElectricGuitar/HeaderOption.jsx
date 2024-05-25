import { useContext, useState } from "react";
import { InputBar } from "../../Pages/Components"
import { ElectricGuitarInterfaceStateContext } from "./Structure";


export function TopOptions(){
    //Global
    const [ interfaceState, interfaceCast ] = useContext(ElectricGuitarInterfaceStateContext);

    return <>
    <header className=" w-full flex flex-wrap gap-5">
        <nav className="shrink-0">
            <label className=" my-text text-sky-300">Scale: </label>
            <InputBar name="scale" />
        </nav>
        <nav className="shrink-0">
            <label className=" my-text text-sky-300">Mode: </label>
            <InputBar name="mode" />
        </nav>
        <nav className="shrink-0">
            <label className=" my-text text-sky-300">Pattern: </label>
            <InputBar name="pattern" disabled />
        </nav>
        <nav className="shrink-0">
            <label className=" my-text text-sky-300">Notes: </label>
            <InputBar name="notes" disabled />
        </nav>
        <nav className="shrink-0 flex gap-2">
            <label className=" my-text text-sky-300">Octave/Register: </label>
            <OctaveLabel circle={false} text="Root" color="#EF4444" />
            <OctaveLabel text={0} color="#DCBABA" />
            <OctaveLabel text={1} color="#78EA83" />
            <OctaveLabel text={2} color="#4D7C0F" />
            <OctaveLabel text={3} color="#0F766E" />
            <OctaveLabel text={4} color="#1D4ED8" />
            <OctaveLabel text={5} color="#6D28D9" />
            <OctaveLabel text={6} color="#BE185D" />
            <OctaveLabel text={7} color="#630000" />
            <OctaveLabel text={8} color="#3D0808" />
        </nav>
    </header>
    </>
}


function OctaveLabel({circle = true, color="blue", text}){
    return <>
    <div className={` rounded-full ${circle ? "aspect-square": "px-2"} h-8 flex justify-center items-center`} style={{backgroundColor: color}} >
        <span className=" my-text text-sky-50 mix-blend-difference">{text}</span>
    </div>
    </>
}


///-- Side Options
export function SideOptions(){
    //Global
    const [ interfaceState, interfaceCast ] = useContext(ElectricGuitarInterfaceStateContext);

    function changeTuneSet(e){
        const {name, value} = e.target;
        const index = Number( name.replace("tune_", "") );
        interfaceCast({tune:"update", index:index, val:value});
    }

    return <>
        <ul className="mt-3 mr-2">
            <li className="mb-1">
                <span className=" my-text text-sky-300">Tune</span>
            </li>
            <TuneBox index={0} onInput={changeTuneSet} />
            <TuneBox index={1} onInput={changeTuneSet} />
            <TuneBox index={2} onInput={changeTuneSet} />
            <TuneBox index={3} onInput={changeTuneSet} />
            <TuneBox index={4} onInput={changeTuneSet} />
            <TuneBox index={5} onInput={changeTuneSet} />
        </ul>
    </>
}

function TuneBox({index, onInput=()=>true}){

    return <>
    <li className="mb-[8px]">
        <InputBar name={"tune_"+index} className=" w-14 " min="-24" max="24" type="number" set={0} onInput={onInput} />
    </li>
    </>
}

