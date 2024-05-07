import { ApiRequestPlate, Fetcher } from "../../helpers/API";
const api = new ApiRequestPlate("http://localhost:8000/api/v1/");


const apiVerifySignupDataFetcher = new Fetcher;
export function ApiVerifySignupData(data){
    const apiRequest = ()=>api.reset().url('signupVerify').data(data).post().request();
    return apiVerifySignupDataFetcher.newApi(apiRequest).addDataWatch( JSON.stringify(data) ).fetch();
}