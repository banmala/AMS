export interface IUser{
    first_name : string,
    last_name : string,
    email : string,
    password : string,
    phone?: string,
    dob?: Date,
    gender?:  EGender,
    address ?: string,
    role?:ERole
}

export enum EGender{"m","f","o"}

export enum ERole{"super_admin","artist_manager","artist"}

export interface ILogin{
    email : string,
    password : string
}