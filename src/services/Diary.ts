import axios from "axios";
import { BaseURL } from "./BaseUrl";

const diaryAPI = axios.create({
    baseURL: BaseURL + `/api/diary`,
    withCredentials: false,
    headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin' : 'true',
    }
})
