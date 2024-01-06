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

export const listActivity = async(userId: number) => {
    try{
        const response = await activityAPI.get('/' + userId)
        return response.data
    }catch(err : any){
        return err.response
    }
}

export const createActivity = async(userId: number, payload: any) => {
    try{
        const response = await activityAPI.post('/' + userId, payload)
        return response.data
    }catch(err : any){
        return err.response
    }
}


