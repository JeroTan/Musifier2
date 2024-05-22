import { Link, useNavigate } from "react-router-dom";
import band_practice from "../../../images/authenticate/band_practice.jpg";
import { Form, MainPage } from "./Components";
import { InputBox } from "../Components";
import { useContext, useState } from "react";
import { ApiRequestCSRF, ApiSignUp, ApiVerifySignupData, authToken } from "../../Utilities/Api";
import { Data, Error, laravelValErrToStr, objToString } from "../../helpers/ParseArgument";
import { Pop } from "../../helpers/Pop";
import { GlobalStateContext } from "../../Utilities/GlobalState";
import { Notif } from "../../helpers/Notif";
import { HrLine } from "../Components";
import LoginWithGoogle from "./LoginWithGoogle";

export default ()=>{
    return <>
        <MainPage background={band_practice}>
            <ThisForm />

        </MainPage>
    </>
}

function ThisForm(){
    //Global
    const navigate = useNavigate();
    const [gState, gCast] = useContext(GlobalStateContext);
    const pop = new Pop(gCast);

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
                const {notify, token} = data;
                authToken.store(token);
                Notif.patch(gCast).new(notify);
                navigate('/');
                pop.type("success").title("Account Created").message("Welcome to Musifier!").button(true, false).run();
            }).s422(data=>{
                pop.close().run();
                err.batch( laravelValErrToStr(data.errors) );
            }).sOthers(data=>{
                pop.close().run();
                const notify = "Your account is not yet created. Something happened on our end. Please try again later.";
                Notif.patch(gCast).new(notify);
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

        <InputBox fieldName="username" onInput={verifyData} error={error.username} value={value.username} />
        <InputBox fieldName="email" onInput={verifyData} error={error.email} />
        <InputBox fieldName="password" type="password" onInput={verifyData} error={error.password} />
        <InputBox fieldName="confirmPassword" displayName="Confirm Password" type="password" onInput={verifyData} error={error.confirmPassword} />

        <div className="my-6"></div>
        <div className=" flex justify-center">
            <button type="submit" className=" my-btn-blue px-3 py-2 ">Create Account</button>
        </div>
        <div className="my-3"></div>

        <HrLine>or</HrLine>

        <div className="my-1 flex flex-col gap-2 items-center w-full">
            <LoginWithGoogle />
        </div>

    </Form>
}

