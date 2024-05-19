import { Link, useNavigate } from "react-router-dom";
import mixer from "../../../images/authenticate/mixer.jpg";
import { Form, InputBox, MainPage } from "./Components";
import { useContext, useState } from "react";
import { Data } from "../../helpers/ParseArgument";
import { GlobalStateContext } from "../../Utilities/GlobalState";
import { ApiLogIn, ApiRequestCSRF, authToken } from "../../Utilities/Api";
import { Notif } from "../../helpers/Notif";
import { Pop } from "../../helpers/Pop";
import { HrLine } from "../Components";
import LoginWithGoogle from "./LoginWithGoogle";

export default ()=>{
    return <>
        <MainPage background={mixer}>
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
        usernameEmail: "",
        password:"",
    }
    const [ value, valueSet] = useState(fields);
    const val = new Data(valueSet);

    //Functionality
    function inputData(e){
        const { name, value } = e.target;
        val.store(name, value);
    }
    function submit(e){
        e.preventDefault();
        pop.type("loading").title("Logging you in. . .").message("Please wait for a while. . .").run();
        ApiRequestCSRF().then(data=>{
            ApiLogIn(value).s201(data=>{
                const {notify, token} = data;
                authToken.store(token);
                if(notify)
                    Notif.patch(gCast).new(notify);
                navigate("/");
                pop.type("success").title("Login Successfully").message("Welcome to Musifier!").button(true, false).run();
            }).s401(data=>{
                pop.type("error").title("Login Failed").message("Username/Email and Password did not match in our system.").button(true, false).run();
            }).s422(data=>{
                pop.close().run();
                const notify = "Invalid input, be sure to input only the right credentials in the fields.";
                Notif.patch(gCast).new(notify);
            }).sOthers(data=>{
                pop.close().run();
                const notify = "You're not yet logged-in. Something happened on our end. Please try again later.";
                Notif.patch(gCast).new(notify);
            })
        }).catch(x=>{
            pop.close().run();
            Notif.patch(gCast).new(x);
        })
    }

    return <>
    <Form onSubmit={submit}>
        <h3 className=" my-title text-sky-300 mt-4 mb-1">Login</h3>
        <small className="my-subtext block text-slate-400">Don't have an account? <Link className="text-sky-300" to={"/signup"}>Sign-up</Link> it now.</small>
        <div className="my-6"></div>

        <InputBox fieldName="usernameEmail" displayName="Username or Email" onInput={inputData} />
        <InputBox fieldName="password" type="password" onInput={inputData}/>

        <div className="my-6"></div>
        <div className=" flex justify-center">
            <button type="submit" className=" my-btn-blue px-3 py-2 ">Login</button>
        </div>
        <div className="my-3"></div>

        <HrLine>or</HrLine>

        <div className="my-1 flex flex-col gap-2 items-center w-full">
            <LoginWithGoogle />
        </div>


    </Form>
    </>
}
