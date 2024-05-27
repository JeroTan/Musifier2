import { createContext } from "react";
import { createMode } from "@/Elements/Instruments/Components.jsx";

//InterfaceDefault
export const InterfaceDefault  = {

    tune: [0,0,0,0,0,0],
    noteSequence: ['A', 'A_sharp', 'B', 'C', 'C_sharp', 'D', 'D_sharp', 'E', 'F', 'F_sharp', 'G', 'G_sharp'],
    notePick: [], //use numbers from 1 to 12 as notes

    //This one is for options only to change/manipulate the data above
    noteFlow: "Ascending", //Descending or Ascending
    scale: "NotSelected", //Key Name of the Scale
    mode: "NotSelected", //This is a number once used
    interfaceType: "default", //"write or default" default use the interactivity of the page while write will freeze the current state in order for them to receive the click data on screen
};

//InterfaceDispatcher
export function InterfaceDispatcher(rawState, action){
    const state = {...rawState};

    if(action?.tune){
        const tune = [...state.tune];
        switch(action.tune){
            case "update":
                let sanitizeValue = Number(action.val);
                const index = action.index;

                if(sanitizeValue > 24) sanitizeValue = 24; else if(sanitizeValue < -24) sanitizeValue = -24;
                tune[index] = sanitizeValue ;
            break;
        }
        console.log(tune);
        state.tune = tune;
    }

    if(action?.noteSequence){
        const noteSequence = {...state.noteSequence};
        switch(action.noteSequence){

        }
        state.noteSequence = noteSequence;
    }

    if(action?.notePick){
        const notePick = [...state.notePick];

        switch(action.notePick){
            case "click":
                const noteClicked = action.val; //Check the click note;
                const clickedIndex = notePick.indexOf(noteClicked);

                if(clickedIndex >= 0){
                    notePick.splice(clickedIndex, 1); //Since it is picked, remove it from the notePick;
                    break;
                }

                //if not picked then add it to the list;
                notePick.push(noteClicked);
                //Get the root for sorting
                const rootNote = notePick[0];
                notePick.sort((next, current)=>{
                    //the rootNote must be always first regardless;
                    //Also Check the noteFlow if descending or ascending
                    if(state.noteFlow == "Ascending"){
                        //we need the root to be at zero since it is first;
                        next = next - rootNote;
                        current = current - rootNote;
                    }else{
                        //We need the root to be at 12(max) so that it will treat still as first when we reverse the sort
                        next = next + (12-rootNote);
                        current = current + (12-rootNote);
                    }
                    next =  (((next)%12)+12)%12;
                    current = (((current)%12)+12)%12;
                    return  state.noteFlow == "Ascending"? next - current : current - next;
                });
            break;
        }
        state.notePick = notePick;
    }

    return state;
}

export const ElectricGuitarInterfaceStateContext = createContext();


//Other definition
export const standardTune = [7, 2, 10, 5, 0, 7]; //Starting from the thinnest string
export const standardRegister = [52, 47, 43, 38, 33, 28]; //Same as above but this is used for overall octave of the string

//Scale
export const Scale = {
    diatonic: {displayName:"Diatonic Scale", pattern: [0, 2, 4, 5, 7, 9, 11], mode:[]}, // A 7 note pattern
    pentatonic: {displayName:"Pentatonic Scale", pattern: [0, 3, 5, 7, 10], mode:[]}, //A 5 note pattern;
};


Scale.diatonic.mode = createMode(Scale.diatonic.pattern, ["Major Scale", "Minor Scale"]);
Scale.pentatonic.mode = createMode(Scale.pentatonic.pattern, ["Minor Pentatonic Scale", "Major Pentatonic Scale"]);


