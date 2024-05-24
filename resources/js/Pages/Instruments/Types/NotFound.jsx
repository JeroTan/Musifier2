import { useNavigate } from "react-router-dom";
import Icon from "../../../Utilities/Icon";
import { Container } from "../../Components";

export function InstrumentNotFound(){
    //Global
    const navigate = useNavigate();

    return <Container>
        <h1 className=" my-text-big text-center mt-10"> Instrument Not Found </h1>
        <div className="flex justify-center mt-2">
            <button className=" my-btn px-3 py-1 flex gap-1 items-center" onClick={()=>navigate("/instrument")}>
                <Icon name="house" inClass="fill-gray-800" outClass="w-4 h-4" />
                <span className=" my-subtext-big">Back To Instrument</span>
            </button>
        </div>
    </Container>
}
