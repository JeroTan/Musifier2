import { useContext } from "react"
import { GlobalStateContext } from "../../Utilities/GlobalState"
import { GoogleLogin } from "@react-oauth/google";
import { ApiSignGoogle, authToken } from "../../Utilities/Api";
import { useNavigate } from "react-router-dom";
import { Pop } from "../../helpers/Pop";
import { Notif } from "../../helpers/Notif";

export default (props)=>{
    //Global
    const [gState, gCast] = useContext(GlobalStateContext);
    const navigate = useNavigate();
    const pop = new Pop(gCast);

    //Functionality
    function success(credentials){
        pop.type("loading").title("Logging you in. . .").message("Please wait for a while. . .").run();
        ApiSignGoogle(credentials).s201(data=>{
            const {token} = data;
            authToken.store(token);
            navigate("/");
            pop.type("success").title("Login Successfully").message("Welcome to Musifier!").button(true, false).run();

        }).sOthers(x=>{
            pop.close().run();
            const notify = "You're not yet logged-in. Something happened on our end. Please try again later.";
            Notif.patch(gCast).new(notify);
        })
    }
    function error(){
        const notify = "There is a problem with Google Sign-up. Please try again later.";
        Notif.patch(gCast).new(notify);
    }

    return <>
        <GoogleLogin onSuccess={success} onError={error} {...props} />
    </>
}
