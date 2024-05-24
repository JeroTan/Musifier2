import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import PagePlate from "../../PagePlate/PagePlate";
import Icon from "../../Utilities/Icon";
import { ChangeView, Container, FilterHeader, InputBar, InputBox, ListingEmpty, ListingItem, ListingLoading, ListingView, Search, Sorter } from "../Components";
import { ApiGetInstrument } from "../../Utilities/Api";
import { Cacher, Conditioner, Debouncer, onlyAlphaString } from "../../helpers/ParseData";
import { copyChildren } from "../../Utilities/ReactParse";
import { Outlet } from "react-router-dom";


//Outside Logic
const searchDebouncer = new Debouncer(250);
const sortDebouncer = new Debouncer(200);
const cacheInstrument = new Cacher("instrument");

export function InstrumentIndex(){
    return <>
    <PagePlate>
        <Outlet />
    </PagePlate>
    </>
}

export function ListInstruments(){

    return <>
        <Container className=" py-5 px-2">
            <LogicView/>
        </Container>
    </>
}


export function LogicView(){
    //Global
    const condInstrument = new Conditioner;

    //Main Component State
    const state = useMemo(()=>({
        filter: {
            search: "",
            view: "wide",
            sortOrder: {},
            sortType: {},
        },
        instruments: undefined, //Will Change to array once fetch is completed
        loading:{
            instruments: false,
        }
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
                case "updateSort":
                    filter.sortOrder = action.sortOrder;
                    filter.sortType = action.sortType;
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

        if(action?.loading){
            const loading = {...rState.loading}
            loading[action.loading] = action.val;
            rState.loading = loading;
        }

        return rState;
    }, []);
    const [ viewState, viewCast ] = useReducer(stateSet, state);

    //Functionality
    function setSearch(e){
        searchDebouncer.do(()=>{
            const { value } = e.target;
            viewCast({filter:"updateSearch", val:value});
        }).run();
    }
    function setView(){
        viewCast({filter:"toggleView"});
    }
    function getInstrument(){
        const query = {
            search:viewState.filter.search,
            sortOrder:viewState.filter.sortOrder,
            sortType: viewState.filter.sortType,
        }

        //Cache
        if(viewState.instruments === undefined){
            cacheInstrument.cExist("data").cDoWhenExist(x=>{
                viewCast({ instruments:"update", val:JSON.parse(x) });
            });
            return;
        }

        viewCast({loading:"instruments",val:true});
        ApiGetInstrument(query).s200(data=>{
            viewCast({loading:"instruments",val:false});
            cacheInstrument.cExist("data", data).cStore().cDoWhenNotExist(x=>{
                viewCast({instruments:"update", val:data});
            });

        });
    }
    function setSort(data = []){
        sortDebouncer.do(x=>{
            const sortOrder = {};
            const sortType = {};
            data.forEach((sorter, i)=>{
                sortOrder[i] = sorter.key;
                sortType[sorter.key] = sorter.type;
            })
            viewCast({filter:"updateSort", sortOrder:sortOrder, sortType:sortType});
        }).run();
    }

    //View DOM
    return <>
        <h1 className=" my-title mb-4">Instruments</h1>

        <FetchData state={viewState} getInstrument={getInstrument} />
        <FilterContents setSearch={setSearch} setView={setView} doSearch={getInstrument} setSort={setSort} />

        <div className="mt-2"></div>
        <ListingView viewType={viewState.filter.view}>

            {condInstrument.ifNot( viewState.instruments && !viewState.loading.instruments, x=>{
                return copyChildren([<ListingLoading />,<ListingLoading />]);
            }).ifNot( viewState.instruments !== undefined && viewState.instruments.length > 0, x=>{
                return <ListingEmpty>Result is Empty</ListingEmpty>
            }).finally(x=>{
                const items = viewState.instruments.map(x=>{
                    return <ListingItem key={x.id} name={x.name} description={x.description} link={onlyAlphaString(x.name)} />
                })
                return copyChildren(items);
            }).return()}

        </ListingView>
        { (viewState.instruments ===undefined || viewState.loading.instruments) && <>
            <div className="mt-2">
                <p className=" my-subtext text-slate-400">
                More instrument will be added in the future. . .
                </p>
            </div>
        </>}

    </>
}

function FetchData(props){
    const { state, getInstrument } = props;
    const { search, sortOrder, sortType } = state.filter;

    //Watch if data changed to fetch a new data
    useEffect(()=>{
        getInstrument();
    }, [search, sortOrder, sortType]);

    return;
}

export function FilterContents(props){
    //State
    const {
        setSearch, doSearch,
        setView,
        setSort,
    } = props;

    return <>
        {/**Header Filter */}
        <FilterHeader>
            <Search setSearch={setSearch} doSearch={doSearch} />
            <ChangeView setView={setView} />
        </FilterHeader>
        {/**Sorter Filter */}
        <div className="my-4"></div>
        <Sorter sortData={{
            "name":"Name",
            "description":"Description"
        }} sortOrdered={setSort} />

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
