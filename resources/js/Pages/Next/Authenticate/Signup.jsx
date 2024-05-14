import { Link } from "react-router-dom";
import band_practice from "../../../images/authenticate/band_practice.jpg";
import { Form, InputBox, MainPage } from "./Components";
import { useState } from "react";
import { ApiVerifySignupData } from "../../../Utilities/Api";

export default ()=>{
    
    return <>
        <MainPage background={band_practice}>
            <ThisForm />
            
        </MainPage>
    </>
}

function ThisForm(){

    //FieldNaming
    const fields = {
        username: "",
        email:"",
        password:"",
        confirmPassword:"",
    }
    const [ value, valueSet] = useState(fields);
    const [ error, errorSet ] = useState(fields);

    //Functionality
    function verifyData(e, state, set){
        const { name, value } = e.target;
        set(value);
        valueSet(prev=>{
            const refPrev = structuredClone(prev);
            refPrev[name] = value;
            return refPrev;
        }); 
        ApiVerifySignupData({[name]:value}).then(({status, data})=>{
            if(status == 422){
                errorSetter(name, data.errors[name]);
            }else if(status == 200){
                errorSetter(name, "");
            }
        }).catch(x=>true);
    }
    function errorSetter(name, value){
        errorSet(prev=>{
            const refPrev = structuredClone(prev);
            const message = typeof value === "object" ? value.join(" ") : value;
            refPrev[name] = message;
            return refPrev
        })
    }


    return <Form >
        <h3 className=" my-title text-sky-300 mt-6">Signup</h3>
        <small className="my-subtext block text-slate-400">Already have an account? <Link className="text-sky-300" to={"/signup"}>Login</Link> it now.</small>
        <div className="my-6"></div>
        
        <InputBox fieldName="username" onInput={verifyData} error={error.username} />
        <InputBox fieldName="email" onInput={verifyData} error={error.email} />
        <InputBox fieldName="password" type="password" onInput={verifyData} error={error.password} />
        <InputBox fieldName="confirmPassword" displayName="Confirm Password" type="password" onInput={verifyData} error={error.confirmPassword} />
        
        <div className="my-6"></div>
        
    </Form>
}

