import { Link } from "react-router-dom";
import band_practice from "../../../images/authenticate/band_practice.jpg";
import { Form, InputBox, MainPage } from "./Components";

export default ()=>{
    
    return <>
        <MainPage background={band_practice}>
            <ThisForm />
            
        </MainPage>
    </>
}

function ThisForm(){
    return <Form >
        <h3 className=" my-title text-sky-300 mt-6">Signup</h3>
        <small className="my-subtext block text-slate-400">Already have an account? <Link className="text-sky-300" to={"/signup"}>Login</Link> it now.</small>
        <div className="my-6"></div>
        
        <InputBox fieldName="username" />
        <InputBox fieldName="email" />
        <InputBox fieldName="password" type="password" />
        <InputBox fieldName="confirmPassword" displayName="Confirm Password" type="password" />
        
        <div className="my-6"></div>
        
    </Form>
}

