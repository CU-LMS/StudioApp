import axios from "axios";

const BASE_URL = "http://3.110.203.20:8800/api"


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