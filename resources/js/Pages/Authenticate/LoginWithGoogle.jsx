import { useContext } from "react"
import { GlobalStateContext } from "../../Utilities/GlobalState"
import { GoogleLogin } from "@react-oauth/google";

export default (props)=>{
    //Global
    const [gState, gCast] = useContext(GlobalStateContext);

    //Functionality
    function success(credentials){
        console.log(credentials);
    }
    function error(){

    }

    return <>
        <GoogleLogin onSuccess={success} onError={error} {...props} />
    </>
}
