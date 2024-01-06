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

export const updateDiary = async (userId: number, payload: any) => {
    try{
        const response = await diaryAPI.put('/'+ userId, payload)
        return response.data
    }
    catch(err:any){
        return err.response.data
    }
}

export const viewDiary = async (userId: number, date: string) => {
    try{
        const response = await diaryAPI.get('/'+ userId + "/detail?date="+ date)
        return response.data
    }
    catch(err:any){
        return err.response.data
    }
}