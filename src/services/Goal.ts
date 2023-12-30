import axios from "axios";
import {goal} from "../utils/TypeData";
import { BaseURL } from "./BaseUrl";

const goalAPI = axios.create({
    baseURL: BaseURL + `/api/goals`,
    withCredentials: false,
    headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin' : 'true',
    }
})

export const createGoalAPI = async (id: number, payload: goal) => {
    try{
        const response = await goalAPI.post('/' + id, payload);
        return response
    }
    catch(err : any){
        return err.response
    }
}

export const viewGoalAPI = async (user_id: number) => {
    try{
        const response = await goalAPI.get('/' + user_id);
        return response
    }
    catch(err : any){
        return err.response
    }
}
