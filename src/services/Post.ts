import axios from "axios"
import { BaseURL } from "./BaseUrl"

const postAPI = axios.create({
    baseURL: BaseURL+ `/api/post`,
    withCredentials: false,
    headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin' : 'true',
    }
})

export const createPost = async (payload: any) => {
    try{
        const response = await postAPI.post("", payload)
        return response
    }catch(err : any){
        return err.response
    }
}

export const updatePost = async (payload: any) => {
    try{
        const response = await postAPI.put("", payload)
        return response
    }catch(err : any){
        return err.response
    }
}

export const deletePost = async (id: number) => {
    try{
        const response = await postAPI.delete("/" + id)
        return response
    }catch(err : any){
        return err.response
    }
}

export const viewListPost = async () => {
    try{
        const response = await postAPI.get("")
        return response
    }catch(err : any){
        return err.response
    }
}

export const viewDetailPost = async (id: number) => {
    try{
        const response = await postAPI.get("/" + id)
        return response
    }catch(err : any){
        return err.response
    }
}

export const createComment = async (payload: any) => {
    try{
        const response = await postAPI.post("/comment", payload)
        return response
    }catch(err : any){
        return err.response
    }
}

export const updateComment = async (id: number, payload: any) => {
    try{
        const response = await postAPI.put("/comment/" + id, payload)
        return response
    }catch(err : any){
        return err.response
    }
}

export const deleteComment = async (id: number) => {
    try{
        const response = await postAPI.delete("/comment/" + id)
        return response
    }catch(err : any){
        return err.response
    }
}

export const viewListComment = async (post_id: number) => {
    try{
        const response = await postAPI.put("/comment/" + post_id)
        return response
    }catch(err : any){
        return err.response
    }
}

export const viewListReaction = async (post_id: number) => {
    try{
        const response = await postAPI.get("/reaction/" + post_id)
        return response
    }catch(err : any){
        return err.response
    }
}

export const updateReaction = async (payload: any) => {
    try{
        const response = await postAPI.put("/reaction", payload)
        return response
    }catch(err : any){
        return err.response
    }
}
