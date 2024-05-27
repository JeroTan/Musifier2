export function createMode(scalePattern = [], modeName = []){
    const mode = [];

    scalePattern.forEach((step, i)=>{ //Step means the gap between each pattern labeled by number;
        const modeData = {key:i, displayName: modeName[i] !== undefined ? modeName[i] : i+1 , pattern: [] };

        const copyOriginalScalePattern = [...scalePattern]; //Make a copy so that the original will be remain untouched when we do a sorting on the next line'
        modeData.pattern = copyOriginalScalePattern.sort((next, curr)=>{
            const padNext = (next+12-step)%12;
            const padCurr = (curr+12-step)%12;
            return padNext - padCurr;
        });

        //After sorting, move the steps in front. Meaning make the starting element as Zero.
        modeData.pattern = modeData.pattern.map(x=>{
            return (x - step + 12)%12;
        })


        mode[i] =modeData;
    });
    return mode;
}


