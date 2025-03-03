import { EGender } from "./auth.types";

export interface IArtist {
    name :string,
    dob?:Date,
    gender:EGender,
    address?:string,
    first_release_year?:Date,
    no_of_albums_released?:number
}