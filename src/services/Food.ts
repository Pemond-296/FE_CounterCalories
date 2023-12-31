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
    }catch(err : any){
        return err.response.data
    }
}

export const viewListFood = async(userId: number) => {
    try{
        const response = await foodAPI.get('/'+ userId)
        return response
    }catch(err : any){
        return err.response
    }
}

export const viewDetailFood = async(id: number) => {
    try{
        const response = await foodAPI.get('/'+ id)
        return response
    }catch(err : any){
        return err.response
    }
}

export const deleteFood = async(id: number) => {
    try{
        const response = await foodAPI.delete('/'+ id)
        return response
    }catch(err : any){
        return err.response
    }
}

export const findFood = async(param: string) => {
    try{
        const response = await foodAPI.get('/query?q='+ param)
        return response
    }catch(err : any){
        return err.response
    }
}

export const publicFood = async(id: number, payload: any) => {
    try{
        const response = await foodAPI.put('/' + id, payload)
        return response
    }catch(err : any){
        return err.response
    }
}

export const pendingFood = async() => {
    try{
        const response = await foodAPI.get('/public')
        return response.data
    }catch(err : any){
        return err.response
    }
}

export const acceptFood = async(id: number, payload: any) => {
    try{
        const response = await foodAPI.put('/approve/' + id, payload)
        return response.data
    }catch(err : any){
        return err.response
    }
}

