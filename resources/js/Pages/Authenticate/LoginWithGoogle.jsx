import { useContext } from "react"
import { GlobalStateContext } from "../../Utilities/GlobalState"
import { GoogleLogin } from "@react-oauth/google";
import { ApiSignGoogle } from "../../Utilities/Api";

export default (props)=>{
    //Global
    const [gState, gCast] = useContext(GlobalStateContext);

    //Functionality
    function success(credentials){
        ApiSignGoogle(credentials).s201(data=>{
            console.log(data);
        }).default(x=>{
            console.log(x);
        })
    }
    function error(){

    }

    return <>
        <GoogleLogin onSuccess={success} onError={error} {...props} />
    </>
}
