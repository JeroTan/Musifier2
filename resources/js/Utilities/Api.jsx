import { ApiRequestPlate, Fetcher, Resolve } from "../helpers/API";
import { AuthToken } from "../helpers/Auth";
const api = new ApiRequestPlate("http://localhost:8000/api/v1/");


//Defining Token Creator Here
export const authToken = new AuthToken;


//**>> Authentication */
const apiVerifySignupDataFetcher = (new Fetcher).withDebounce(250);
export function ApiVerifySignupData(data){
    const apiRequest = ()=>api.reset().url('signupVerify').data(data).post().request();
    const apiFetched = apiVerifySignupDataFetcher.newApi(apiRequest).fetch();
    const resolver = new Resolve(apiFetched);
    return resolver;
}

export function ApiSignUp(data){
    const apiRequest = api.reset().url('signup').data(data).post().request();
    const resolver = new Resolve(apiRequest);
    return resolver;
}
//**<< Authentication */
