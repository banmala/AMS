export interface IMusic {
    id?:number,
    artist_id:number,
    title:string,
    album_name:string,
    genre:EGenre,
}


export enum EGenre{
    'rnb', 'country', 'classic', 'rock', 'jazz'
}