import { useContext, useEffect } from "react"
import PagePlate from "../../PagePlate/PagePlate"
import { ApiLogOut, ApiRequestCSRF, authToken } from "../../Utilities/Api";
import { Notif } from "../../helpers/Notif";
import { GlobalStateContext } from "../../Utilities/GlobalState";
import { useNavigate } from "react-router-dom";

export default()=>{
    //global
    const [gState, gCast] = useContext(GlobalStateContext);
    const navigate = useNavigate();

    useEffect(()=>{
        ApiRequestCSRF().then(x=>{
            ApiLogOut().s201(x=>{
                authToken.remove();
                Notif.patch(gCast).new("Log out successfully");
                navigate('/');
            }).sOthers(x=>{
                authToken.remove();
                navigate('/');
            });
        });
    }, []);

    return <PagePlate clean={true}>
        <h1 className=" my-title-big">Logging you out. . .</h1>
    </PagePlate>
}
