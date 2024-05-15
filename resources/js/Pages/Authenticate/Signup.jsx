import { Link } from "react-router-dom";
import band_practice from "../../images/authenticate/band_practice.jpg";
import { Form, InputBox, MainPage } from "./Components";
import { useState } from "react";
import { ApiVerifySignupData } from "../../Utilities/Api";
import { Data, Error, objToString } from "../../helpers/ParseArgument";

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
    const val = new Data(valueSet);
    const err = new Error(errorSet);

    //Functionality
    function verifyData(e){ //Since this is the Input component
        const { name, value } = e.target;
        val.store(name, value);
        ApiVerifySignupData({[name]:value}).s200(data=>{
            err.store(name, "");
        }).s422(data=>{
            err.store(name, objToString(data.errors[name]));
        })
    }
    function submit(e){

    }


    return <Form onSubmit={submit}>
        <h3 className=" my-title text-sky-300 mt-4 mb-1">Signup</h3>
        <small className="my-subtext block text-slate-400">Already have an account? <Link className="text-sky-300" to={"/login"}>Login</Link> it now.</small>
        <div className="my-6"></div>

        <InputBox fieldName="username" onInput={verifyData} error={error.username} />
        <InputBox fieldName="email" onInput={verifyData} error={error.email} />
        <InputBox fieldName="password" type="password" onInput={verifyData} error={error.password} />
        <InputBox fieldName="confirmPassword" displayName="Confirm Password" type="password" onInput={verifyData} error={error.confirmPassword} />

        <div className="my-6"></div>
        <div className=" flex justify-center">
            <button type="submit" className=" my-btn-blue px-3 py-2 ">Create Account</button>
        </div>
        <div className="my-3"></div>


    </Form>
}

