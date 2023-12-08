import axios from "axios";
import { goal } from "../utils/TypeData";

const goalAPI = axios.create({
    baseURL: process.env.REACT_NATIVE_NUTRITION_APP + `/api/goals`,
    withCredentials: false,
    headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin' : 'true',
    }
})

export const createGoalAPI = async (payload: goal) => {
    try{
        const response = await goalAPI.post('', payload);
        return response
    }
    catch(err){
        throw err
    }
}

export const viewGoalAPI = async (user_id: number) => {
    try{
        const response = await goalAPI.get('/' + user_id);
        return response
    }
    catch(err){
        throw err
    }
}
