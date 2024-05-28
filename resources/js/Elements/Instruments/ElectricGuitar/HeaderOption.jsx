import { useContext, useState } from "react";
import { InputBar } from "@/Pages/Components"
import { ElectricGuitarInterfaceStateContext } from "./Structure";
import { DropDown, DropDownItem } from "../../../Pages/Components";
import { convertToNotes, notePattern, Scale } from "../Components";
import Icon from "../../../Utilities/Icon";

export function TopOptions(){
    //Global
    const [ interfaceState, interfaceCast ] = useContext(ElectricGuitarInterfaceStateContext);
    const scaleState = interfaceState.scale;
    const modeState = interfaceState.mode;
    const { notePick, noteFlow, pattern, interfaceType, isWritable } = interfaceState;

    //Functionality
    function updateScale(e){
        const { value } = e.target;
        interfaceCast({scale:"update", val:value});
    }
    function updateMode(e){
        const { value } = e.target;
        interfaceCast({mode:"update", val:value});
    }
    function togglePattern(e){
        interfaceCast({pattern:"toggle"});
    }
    function toggleFlow(e){
        interfaceCast({noteFlow:"toggle"});
    }
    function toggleInterface(e){
        interfaceCast({interfaceType:"toggle"});
    }

    return <>
    <header className=" w-full flex flex-wrap gap-x-5 gap-y-2 mb-2">
        <nav className="shrink-0">
            <label className=" my-text text-sky-300">Scale: </label>
            <DropDown set={scaleState} onChange={updateScale}>
                { Object.keys(Scale).map(key=>{
                    const data = Scale[key];
                    return <DropDownItem key={key} label={data.displayName} value={key} />
                }) }
                <DropDownItem label="Not Selected" value="notSelected" />
            </DropDown>
        </nav>
        <nav className="shrink-0">
            <label className=" my-text text-sky-300">Mode: </label>
            <DropDown set={modeState} onChange={updateMode}>
                { Scale[scaleState] === undefined ? "" : Scale[scaleState].mode.map(data=>{
                    return <DropDownItem key={data.key} label={data.displayName} value={data.key} />
                }) }
                <DropDownItem label="Not Selected" value="NotSelected" />
            </DropDown>
        </nav>
        <nav className="shrink-0 relative">
            <label className=" my-text text-sky-300">Pattern: </label>
            {notePick.length > 0 && <>
                <Icon name="refresh"
                    inClass={"fill-slate-500 group-hover:fill-slate-400"}
                    outClass={"w-5 h-5 absolute cursor-pointer group z-10"}
                    style={{top:"7px", left:"72px"}} onClick={togglePattern}
                />
            </>}
            <InputBar name="pattern" style={{ paddingLeft: "30px", width:"265px", flexBasis:"unset"}} disabled set={ notePattern(notePick, pattern).join(", ") } />
        </nav>
        <nav className="shrink-0">
            <label className=" my-text text-sky-300">Notes: </label>
            <InputBar name="notes" disabled style={{ width:"265px", flexBasis:"unset"}} set={convertToNotes(notePick, noteFlow=="Ascending"?"sharp":"flat").join(", ")} />
        </nav>
        <nav className="shrink-0 flex gap-2">
            <label className=" my-text text-sky-300">Flow: </label>
            <div className=" cursor-pointer my-textbox flex gap-1 items-center group" style={{paddingLeft:"6px"}} onClick={toggleFlow} >
                <Icon name="refresh" inClass={"fill-slate-500 group-hover:fill-slate-300"} outClass={"w-5 h-5"}   />
                {noteFlow}
            </div>
        </nav>
        {isWritable && <>
            <nav className="shrink-0 flex gap-2">
                <label className=" my-text text-sky-300 break-keep" style={{whiteSpace:"nowrap"}}>Interface Mode: </label>
                <div className=" cursor-pointer my-textbox flex gap-1 items-center group" style={{paddingLeft:"6px"}} onClick={toggleInterface} >
                    <Icon name="refresh" inClass={"fill-slate-500 group-hover:fill-slate-300"} outClass={"w-5 h-5"}   />
                    {interfaceType}
                </div>
            </nav>
        </>}

        <nav className="shrink-0 flex gap-2">
            <label className=" my-text text-sky-300">Octave/Register: </label>
            <OctaveLabel circle={false} text="Root" color="#EF4444" />
            <OctaveLabel text={0} color="#938787" />
            <OctaveLabel text={1} color="#709C74" />
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
    <div className={` rounded-full ${circle ? "aspect-square": "px-2"} h-7 flex justify-center items-center`} style={{backgroundColor: color}} >
        <span className=" text-sky-50 ">{text}</span>
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

