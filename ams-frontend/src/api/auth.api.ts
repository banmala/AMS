import api from "@/config/axios";
import { EGender, ERole } from "@/@types/auth.type";
import { apiRequest } from "@/lib/request";

export interface UserRegisterInputData extends LoginInputData {
  first_name : string,
  last_name : string,
  phone?: string,
  dob?: Date,
  gender?:  EGender,
  address ?: string,
  role?:ERole
}

export interface LoginInputData {
  email: string;
  password: string;
}

export const registerUserApi = (registerData: UserRegisterInputData) =>
  apiRequest(api.post("/auth/register", registerData));

export const loginUserApi = (loginData: LoginInputData) =>
  apiRequest(api.post("/auth/login", loginData));

export const getUserData = async () =>{
  return  await apiRequest(api.get("/user/authUser"));
}
