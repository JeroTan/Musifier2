export function createMode(scalePattern = [], modeName = []){
    const mode = [];

    scalePattern.forEach((step, i)=>{ //Step means the gap between each pattern labeled by number;
        const modeData = {key:i, displayName: modeName[i] !== undefined ? modeName[i] : i+1 , pattern: [] };

        const copyOriginalScalePattern = [...scalePattern]; //Make a copy so that the original will be remain untouched when we do a sorting on the next line'
        modeData.pattern = reorientPattern(copyOriginalScalePattern, step);

        //After sorting, move the steps in front. Meaning make the starting element as Zero.
        modeData.pattern = offsetPattern(modeData.pattern, step);

        mode[i] =modeData;
    });
    return mode;
}

export function reorientPattern(notes, step){
    return notes.sort((next, curr)=>{
        const padNext = (next+12-step)%12;
        const padCurr = (curr+12-step)%12;
        return padNext - padCurr;
    });
}

export function sortPattern(notes){
    return notes.sort((next, curr)=>{
        return next - curr;
    });
}

export function offsetPattern(notes, step){
    return notes.map(note=>{
        return (note - step + 12)%12;
    })
}

export function gapOfPatterns(notes){
    const gapPattern = [];
    for(let i = 0; i < notes.length; i++){
        if(notes.length-1 == i){
            gapPattern.push(12 - notes[i]);
            break;
        }
        gapPattern.push( notes[i+1] - notes[i] );
    }
    return gapPattern;
}


export function notePattern(rawPattern = [], type="steps"){//@type - steps, tones, numbers, gaps
    const gaps = sortPattern(  offsetPattern(rawPattern, rawPattern[0])  );
    if(gaps.length < 1)
        return [];

    const newPattern = [];
    const gapPattern = gapOfPatterns(gaps);
    switch(type){
        case "steps":{
            gapPattern.forEach(gap=>{
                let steps = "";
                while(0 < gap){
                    if(2 <= gap){
                        steps += "W";
                    }
                    else{
                        steps += "H"
                    }
                    gap -= 2;
                }
                newPattern.push(steps);
            });
            break;
        }
        case "tones":{
            gapPattern.forEach(gap=>{
                let tones = "";
                while(0 < gap){
                    if(2 <= gap){
                        tones += "T";
                    }
                    else{
                        tones += "S"
                    }
                    gap -= 2;
                }
                newPattern.push(tones);
            });
            break;
        }
        case "numbers":{
            gaps.forEach(x=>{
                newPattern.push(x+1);
            })
            break;
        }
        case "gaps":{
            return gapPattern;
            break;
        }
    }
    return newPattern;
}
export const notePatternType = ["steps", "tones", "numbers", "gaps"];


export function convertToNotes( pattern, type = "Ascending" ){ //type = "Ascending" or "Descending"
    const patternCopy = pattern.map(x=>x+1); //This is to ensure that pattern starts at 1 not zero;

}

const standardNotesSharps = [];


const sharp = ['#','#','♯','sharp','_#','_#','_♯','_sharp'];
const flat = ['b','♭','flat','_b','_♭','_flat'];
