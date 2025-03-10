import { JwtPayload } from "jwt-decode";

export interface ILoginResponse {
    user: IUser;
    token: string;
}


export interface IUser{
    id?:string,
    first_name : string,
    last_name : string,
    email : string,
    password : string,
    phone?: string,
    dob?: Date|string,
    gender?:  EGender,
    address ?: string,
    role?:ERole
}

export enum EGender{"m","f","o"}

export enum ERole{"super_admin","artist_manager","artist"}
export interface JwtPayloadExtended extends JwtPayload {
    data?: any;
  }
