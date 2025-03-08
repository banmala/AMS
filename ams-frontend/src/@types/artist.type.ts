import { EGender } from "./auth.type";

export interface IArtist {
    id?:number,
    name :string,
    dob?:Date|string,
    gender:EGender,
    address?:string,
    first_release_year?:Date,
    no_of_albums_released?:number
}