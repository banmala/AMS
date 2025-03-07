import api from "@/config/axios";
import { apiRequest } from "@/lib/request";
import { UserRegisterInputData } from "./auth.api";


export const getAllUserData = async () =>{
  return  await apiRequest(api.get("/user"));
}

export const deleteUserById = async (id:number) => {
  return await apiRequest(api.delete(`/user/${id}`))
}

export const fetchUserDetailById = async (id:number) =>{
  return  await apiRequest(api.get(`/user/${id}`));
}

export const updateUserApi = (registerData: UserRegisterInputData, id:number) => {
  return apiRequest(api.put(`/user/${id}`, registerData));
}
