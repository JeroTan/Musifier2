import { ApiRequestPlate, Fetcher, Resolve } from "../helpers/API";
import { AuthToken, CsrfToken } from "../helpers/Auth";

const endPoint = "http://localhost:8000/";
const api = new ApiRequestPlate(endPoint+"api/v1/");


//Defining Token Creator Here
export const authToken = new AuthToken;
export const csrfToken = new CsrfToken;


//**>> Authentication */
export function ApiRequestCSRF(){
    const request = (new ApiRequestPlate(endPoint)).reset().url('sanctum/csrf-cookie/').get().request();
    return new Promise((resolve, reject)=>{
        request.then(x=>{
            if(x.status == 204)
                resolve(true);
            else
                reject("csrf protection rejected");
        })
    });
}

const apiVerifySignupDataFetcher = (new Fetcher).withDebounce(250);
export function ApiVerifySignupData(data){
    const apiRequest = ()=>api.reset().url('signupVerify').data(data).post().request();
    const apiFetched = apiVerifySignupDataFetcher.newApi(apiRequest).fetch();
    const resolver = new Resolve(apiFetched);
    return resolver;
}

export function ApiSignUp(data){
    const apiRequest = api.reset().url('signup').data(data).post().withCredentials().request();
    const resolver = new Resolve(apiRequest);
    return resolver;
}

export function ApiLogOut(){
    const apiRequest = api.reset().url('logout').auth().delete().withCredentials().withXSRFToken().request();
    const resolver = new Resolve(apiRequest);
    return resolver;
}
//**<< Authentication */
