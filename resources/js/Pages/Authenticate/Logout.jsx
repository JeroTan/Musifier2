import { useContext, useEffect } from "react"
import piano_background from "../../../images/authenticate/piano_background.jpg";
import PagePlate from "../../PagePlate/PagePlate"
import { ApiLogOut, ApiRequestCSRF, authToken } from "../../Utilities/Api";
import { Notif } from "../../helpers/Notif";
import { GlobalStateContext } from "../../Utilities/GlobalState";
import { useNavigate } from "react-router-dom";
import { Pop } from "../../helpers/Pop";

export default()=>{
    //global
    const [gState, gCast] = useContext(GlobalStateContext);
    const navigate = useNavigate();
    const pop = new Pop(gCast);

    useEffect(()=>{
        pop.type("loading").title("Logging you out").message("Please wait for a while").run();
        ApiRequestCSRF().then(x=>{
            ApiLogOut().s201(x=>{
                Notif.patch(gCast).new("Log out successfully");
            }).sElse(x=>{
                pop.close().run();
                authToken.remove();
                navigate('/');
            });
        });
    }, []);

    return <PagePlate clean={true}>
        <div className=" relative w-full h-screen bg-sky-900 bg-blend-multiply" style={{
            backgroundImage: `url(${piano_background})`,
        }}>
        </div>
    </PagePlate>
}
