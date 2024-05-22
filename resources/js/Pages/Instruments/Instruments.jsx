import { useCallback, useEffect, useMemo, useReducer } from "react";
import PagePlate from "../../PagePlate/PagePlate";
import Icon from "../../Utilities/Icon";
import { Container, InputBar, InputBox, ListingItem, ListingView } from "../Components";
import { ApiGetInstrument } from "../../Utilities/Api";

export function ListInstruments(){

    return <>
        <PagePlate>
            <Container className=" py-5 px-2">
                <View/>
            </Container>
        </PagePlate>
    </>
}


export function View(){
    //Main Component State
    const state = useMemo(()=>({
        filter: {
            search: "",
            view: "wide",
        },
        instruments: undefined, //Will Change to array once fetch is completed
    }), []);
    const stateSet = useCallback((state, action)=>{
        const rState = {...state};
        if(action?.filter){
            const filter = {...rState.filter};
            switch(action.filter){
                case "updateSearch":
                    filter.search = action.val;
                break;
                case "toggleView":
                    filter.view = filter.view=="wide"?"compact":"wide";
                break;

            }
            rState.filter = filter;
        }
        if(action?.instruments){
            switch(action.instruments){
                case "update":
                    rState.instruments = action.val;
                break;
            }
        }

        return rState;
    }, []);
    const [ viewState, viewCast ] = useReducer(stateSet, state);

    //Functionality
    function setSearch(e){
        const { value } = e.target.value;
        viewCast({filter:"updateSearch", val:value});
    }
    function setView(){
        viewCast({filter:"toggleView"});
    }
    function doSearch(){

    }
    function setInstruments(val){
        viewCast({instruments:"update", val:val});
    }


    return <>
        <h1 className=" my-title mb-4">Instruments</h1>

        <FetchData setInstruments={setInstruments} />
        <FilterContents setSearch={setSearch} setView={setView} doSearch={doSearch} />
        <div className="mt-5"></div>
        <ListingView>
            {viewState.instruments?<>
                {viewState.instruments.map(x=>{
                    console.log(x);
                    return <ListingItem key={x.id} name={x.name} description={x.description}  />
                })}
            </>:<>
            </>}
        </ListingView>
    </>
}

function FetchData(props){
    const { state, setInstruments } = props;
    // const { search } = state;

    useEffect(()=>{
        ApiGetInstrument().s200(data=>{
            setInstruments(data);
        });
    }, [])

    return;
}

export function FilterContents(props){
    //State
    const {
        setSearch, doSearch,
        setView
    } = props;


    return <>
        {/**Header Filter */}
        <form className=" w-full flex flex-wrap justify-between" aria-label="Filtering Components" onSubmit={e=>e.preventDefault()}>
            {/**Left Side */}
            <div className="flex">
                <Search setSearch={setSearch} doSearch={doSearch} />
            </div>
            {/**Right Side */}
            <div className=" flex gap-2 flex-wrap">
                <ChangeView setView={setView} />
            </div>
        </form>
    </>
}

export function Search(props){
    const { setSearch, doSearch } = props;

    return <>
        <div className=" flex gap-2">
            <InputBar name="search" onClick={setSearch} />
            <button className=" my-btn px-3" onClick={doSearch}>
                <Icon name="search" inClass=" fill-gray-800" outClass=" w-4 h-4" />
            </button>
        </div>
    </>
}

export function ChangeView(props){
    const { setView } = props;

    return <>
        <button className=" my-btn px-3" onClick={setView}>
            <Icon name={"wideView"} inClass=" fill-gray-800" outClass=" w-4 h-4" />
        </button>
    </>
}
// export function ToggleFilterOption(props){
//     const { toggler } = props;

//     return <>
//         <button className=" my-btn px-3 flex gap-1 items-center" onClick={toggler}>
//             <span>Filter</span>
//             <Icon name={"filter"} inClass=" fill-gray-800" outClass=" w-4 h-4" />
//         </button>
//     </>
// }

// export function FilterOptions(props){
//     const { isOpen } = props;

//     if(!isOpen)
//         return ""

//     return <>
//     </>
// }
