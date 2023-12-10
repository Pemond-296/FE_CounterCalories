import axios from "axios";
import { BaseURL } from "./BaseUrl";

const foodAPI = axios.create({
    baseURL: BaseURL + `/api/food`,
    withCredentials: false,
    headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin' : 'true',
    }
})

export const createFood = async(payload: any) => {
    try{
        const response = await foodAPI.post("", payload)
        return response
    }catch(err){
        throw err
    }
}

export const viewListFood = async() => {
    try{
        const response = await foodAPI.get('')
        return response
    }catch(err){
        throw err
    }
}

export const viewDetailFood = async(id: number) => {
    try{
        const response = await foodAPI.get('/'+ id)
        return response
    }catch(err){
        throw err
    }
}

export const deleteFood = async(id: number) => {
    try{
        const response = await foodAPI.delete('/'+ id)
        return response
    }catch(err){
        throw err
    }
}

export const findFood = async(param: string) => {
    try{
        const response = await foodAPI.get('/query?q='+ param)
        return response
    }catch(err){
        throw err
    }
}

export const publicFood = async(id: number, payload: any) => {
    try{
        const response = await foodAPI.put('/'+ id, payload)
        return response
    }catch(err){
        throw err
    }
}