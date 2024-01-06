import axios from "axios";
import { BaseURL } from "./BaseUrl";

const imgAPI = axios.create({
    baseURL: BaseURL + `/api`,
    headers: {
        'Content-Type' : 'multipart/form-data',
    }
})

export const imageAPI = async (file: any) => {
    try{
        const response = await imgAPI.post("/image", file)
        return response
    }catch(err : any){
        return err.response
    }
}