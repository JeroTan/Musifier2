import { Link, useNavigate } from "react-router-dom";
import band_practice from "../../images/authenticate/band_practice.jpg";
import { Form, InputBox, MainPage } from "./Components";
import { useContext, useState } from "react";
import { ApiRequestCSRF, ApiSignUp, ApiVerifySignupData, authToken } from "../../Utilities/Api";
import { Data, Error, laravelValErrToStr, objToString } from "../../helpers/ParseArgument";
import { Pop } from "../../helpers/Pop";
import { GlobalStateContext } from "../../Utilities/GlobalState";
import { Notif } from "../../helpers/Notif";

export default ()=>{

    return <>
        <MainPage background={band_practice}>
            <ThisForm />

        </MainPage>
    </>
}

function ThisForm(){
    //global
    const navigate = useNavigate();
    const [gState, gCast] = useContext(GlobalStateContext);

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
    const pop = new Pop(gCast);


    //Functionality
    function verifyData(e){
        const { name, value } = e.target;
        val.store(name, value);
        err.store(name, "");
        ApiVerifySignupData({[name]:value}).s422(data=>{
            err.store(name, objToString(data.errors[name]));
        })
    }
    function submit(e){
        e.preventDefault();
        pop.type("loading").title("Creating Your Account").message("Please wait for a while. . .").run();
        ApiRequestCSRF().then(x=>{
            ApiSignUp(value).s201(data=>{
                const {message, token} = data;
                authToken.store(token);
                Notif.patch(gCast).new(message);
                navigate('/');
                pop.type("success").title("Account Created").message("Welcome to Musifier!").button(true, false).run();
            }).s422(data=>{
                pop.close().run();
                err.batch( laravelValErrToStr(data.errors) );
            }).sOthers(data=>{
                pop.close().run();
                let message = "Your account is not yet created. Something happened on our end. Please try again later.";
                if(typeof data == "string")
                    message = data;
                Notif.patch(gCast).new(message);
            });
        }).catch(x=>{
            pop.close().run();
            Notif.patch(gCast).new(x);
        })

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

