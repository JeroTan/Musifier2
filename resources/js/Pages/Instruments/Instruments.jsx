import PagePlate from "../../PagePlate/PagePlate";
import { ListingItem, ListingView } from "../Components";

export function ListInstruments(){
    return <>
        <PagePlate>
            <div className="my-96"></div>
            <ListingView>
                <ListingItem name="Example" />
            </ListingView>
        </PagePlate>
    </>
}
