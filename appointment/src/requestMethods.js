import axios from "axios";

const BASE_URL = "http://localhost:8800/api"
const PRODUCTION_URL = "http://3.110.176.68/api"


let TOKEN;
const getToken = ()=>{
    if(localStorage.getItem("user")){
        TOKEN = JSON.parse(localStorage.getItem("user"))?.accestoken
}
}
getToken()

export const publicRequest = axios.create({
    baseURL: BASE_URL
})
export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`}
})