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

export const createActivity = async( payload: any) => {
    try{
        const response = await activityAPI.post('/', payload)
        return response.data
    }catch(err : any){
        return err.response
    }
}

export const deleteActivity = async(id: number) => {
    try{
        const response = await activityAPI.delete('/'+ id)
        return response
    }catch(err : any){
        return err.response
    }
}

export const publicActivity = async(id: number, payload: any) => {
    try{
        const response = await activityAPI.put('/'+ id, payload)
        return response.data
    }catch(err : any){
        return err.response.data
    }
}

export const pendingActivity = async() => {
    try{
        const response = await activityAPI.get('/public')
        return response.data
    }catch(err : any){
        return err.response
    }
}

export const acceptActivity = async(id: number, payload: any) => {
    try{
        const response = await activityAPI.put('/approve/' + id, payload)
        return response.data
    }catch(err : any){
        return err.response
    }
}
