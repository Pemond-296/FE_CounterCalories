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
    catch(err : any){
        return err.response.data
    }
}

export const registerAPI = async (payload: userLogin) => {
    try{
        const response = await userAPI.post('/sign-up', payload);
        return response
    }
    catch(err : any){
        return err.response
    }
}

export const updateInfor = async (payload: userSignup) => {
    try{
        const response = await userAPI.put('/update', payload);
        return response
    }
    catch(err : any){
        return err.response
    } 
} 

export const changePassword = async (payload: updatePassword) => {
    try{
        const response = await userAPI.put('/change-password', payload);
        return response
    }
    catch(err : any){
        return err.response
    } 
}

export const viewProfile = async (id: number) => {
    try{
        const response = await userAPI.get('/view-profile/' + id);
        return response
    }
    catch(err : any){
        return err.response.data
    } 
}

export const deleteUser = async(id: number) => {
    try{
        const response = await userAPI.delete('/'+ id)
        return response
    }catch(err : any){
        return err.response
    }
}

export const createAdmin = async(payload: userLogin) => {
    try{
        const response = await userAPI.post('/admin', payload)
        return response
    }catch(err : any){
        return err.response
    }
}

export const viewAllUser = async () => {
    try{
        const response = await userAPI.get('/all-user')
        return response
    }catch(err : any){
        return err.response
    }
}

export const viewBanUser = async () => {
    try{
        const response = await userAPI.get('/ban-user')
        return response
    }catch(err : any){
        return err.response
    }
}