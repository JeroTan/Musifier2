import { useReducer } from "react";
import { ElectricGuitarInterfaceStateContext, InterfaceDefault, InterfaceDispatcher } from "./Structure";
import { Fretboard } from "./Fretboard";
import { Interactable } from "./Interactable";
import { SideOptions, TopOptions } from "./HeaderOption";

//This will be the main export with lazy loading
export default function(props){
    //Parent Config
    const { isWritable } = props;

    //Reduced the Structure Data
    const [interfaceState, interfaceCast] = useReducer(InterfaceDispatcher, InterfaceDefault);

    return <>
    <ElectricGuitarInterfaceStateContext.Provider value={[interfaceState, interfaceCast]}>
        <main className="xl:[110rem] lg:w-[100rem] md:w-[80rem] w-[70rem]">
            {/** Other Options goes to the header */}
            <TopOptions />

            {/**Fretboard with along with its side option for tuning */}
            <section className=" w-full flex">
                <SideOptions />
                <Fretboard>
                    <Interactable />
                </Fretboard>
            </section>

        </main>
    </ElectricGuitarInterfaceStateContext.Provider>
    </>
}
