import { IMusic } from "@/@types/music.type";
import api from "@/config/axios";
import { apiRequest } from "@/lib/request";

export const createMusicApi = (createMusicData: IMusic) => {
  return apiRequest(api.post(`/music`, createMusicData));
}

export const getAllMusicData = async () =>{
  return  await apiRequest(api.get("/music"));
}

export const fetchMusicDetailById = async (id:number) =>{
  return  await apiRequest(api.get(`/music/${id}`));
}

export const fetchMusicByArtistId = async (artistId:number) =>{
  return  await apiRequest(api.get(`/music/artist/${artistId}`));
}

export const updateMusicApi = (updateMusicData: IMusic, id:number) => {
  return apiRequest(api.put(`/music/${id}`, updateMusicData));
}

export const deleteMusicById = async (id:number) => {
  return await apiRequest(api.delete(`/music/${id}`))
}