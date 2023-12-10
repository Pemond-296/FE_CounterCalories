import axios from "axios";
import { BaseURL } from "./BaseUrl";

const activityAPI = axios.create({
    baseURL: BaseURL + `/api/activity`,
    withCredentials: false,
    headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin' : 'true',
    }
})
