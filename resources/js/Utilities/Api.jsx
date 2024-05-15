import { ApiRequestPlate, Fetcher, Resolve } from "../helpers/API";
const api = new ApiRequestPlate("http://localhost:8000/api/v1/");


//**>>> Authentication */
const apiVerifySignupDataFetcher = new Fetcher;
export function ApiVerifySignupData(data){
    const apiRequest = ()=>api.reset().url('signupVerify').data(data).post().request();
    const apiFetched = apiVerifySignupDataFetcher.newApi(apiRequest).addDataWatch( JSON.stringify(data) ).fetch();
    const resolver = new Resolve(apiFetched);
    return resolver;
}

export function ApiSignUp(data){
    const apiRequest = api.reset().url('signup').data(data).post().request();
    const resolver = new Resolve(apiRequest);
    return resolver;
}
//**<<< Authentication */
