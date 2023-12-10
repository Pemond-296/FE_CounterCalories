import axios from "axios";
import { updatePassword, userLogin, userSignup} from "../utils/TypeData";
import { BaseURL } from "./BaseUrl";

const userAPI = axios.create({
    baseURL: BaseURL+ `/api/user`,
    withCredentials: false,
    headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin' : 'true',
    }
})

export const loginAPI = async (payload: userLogin) => {
    try{
        const response = await userAPI.post('/sign-in', payload);
        return response
    }
    catch(err){
        throw err
    }
}

export const registerAPI = async (payload: userLogin) => {
    try{
        const response = await userAPI.post('/sign-up', payload);
        return response
    }
    catch(err){
        throw err
    }
}

export const updateInfor = async (payload: userSignup) => {
    try{
        const response = await userAPI.put('/update', payload);
        return response
    }
    catch(err){
        throw err
    } 
} 

export const changePassword = async (payload: updatePassword) => {
    try{
        const response = await userAPI.put('/change-password', payload);
        return response
    }
    catch(err){
        throw err
    } 
}

export const viewProfile = async (id: number) => {
    try{
        const response = await userAPI.get('/view-profile/' + id);
        return response
    }
    catch(err){
        throw err
    } 
}

export const deleteUser = async(id: number) => {
    try{
        const response = await userAPI.delete('/'+ id)
        return response
    }catch(err){
        throw err
    }
}

export const createAdmin = async(payload: userLogin) => {
    try{
        const response = await userAPI.post('/admin', payload)
        return response
    }catch(err){
        throw err
    }
}
