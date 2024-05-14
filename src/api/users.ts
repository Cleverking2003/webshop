import { User } from "../Interfaces";
import { authAxios, axi } from "./useAxios";

export const get_solo_user = async (id: number) => {
    const response = await authAxios.get(`/users/${id}/`) 
    return response.data
};

export const edit_user = async (data: User) => {
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("last_name", data.last_name)
    formData.append("email", data.email)
    if (data.avatar) {
        formData.append("avatar", data.avatar)
    }
    await authAxios.put(`/users/edit/${data.email}/`, formData)
};

export const search_users = async (query: string) => {
   const response = await authAxios.get(`/users?query=${query}`) 
   return response.data
};

export const delete_user = async (id: number) => {
    await authAxios.delete(`/users/${id}/`) 
};

export const get_users = async () => {
   const response = await authAxios.get("/users/") 
   return response.data
};

export const registerRequest = async (email: string, name: string, last_name: string, password: string) => {
    await axi.post("/users/register/", {email, name, last_name, password})
};

export const loginRequest = async (username: string, password: string) => {
    const response = await axi.post("/token/", {username, password})
    return response;
};
