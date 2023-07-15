import axios from "axios";

const BASE_URL = "http://localhost:8800/api"
const PRODUCTION_URL = "https://api.unicornfortunes.com/api"

let TOKEN;
const getToken = ()=>{
    if(localStorage.getItem("user")){
        TOKEN = JSON.parse(localStorage.getItem("user"))?.accestoken
}
}
getToken()

export const publicRequest = axios.create({
    baseURL: PRODUCTION_URL
})
export const userRequest = axios.create({
    baseURL: PRODUCTION_URL,
    headers: {token: `Bearer ${TOKEN}`}
})
