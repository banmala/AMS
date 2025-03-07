import api from "@/config/axios";
import { EGender, ERole } from "@/@types/auth.type";
import { apiRequest } from "@/lib/request";


export const getAllUserData = async () =>{
  return  await apiRequest(api.get("/user"));
}

export const deleteUserById = async (id:number) => {
  return await apiRequest(api.delete(`/user/${id}`))
}

export const fetchUserDetailById = async (id:number) =>{
  return  await apiRequest(api.get(`/user/${id}`));
}