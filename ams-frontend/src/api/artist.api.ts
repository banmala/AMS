import { IArtist } from "@/@types/artist.type";
import api from "@/config/axios";
import { apiRequest } from "@/lib/request";

export const createArtistApi = (createArtistData: IArtist) => {
  return apiRequest(api.post(`/artist`, createArtistData));
}

export const getAllArtistData = async () =>{
  return  await apiRequest(api.get("/artist"));
}

export const fetchArtistDetailById = async (id:number) =>{
  return  await apiRequest(api.get(`/artist/${id}`));
}

export const updateArtistApi = (updateArtistData: IArtist, id:number) => {
  return apiRequest(api.put(`/artist/${id}`, updateArtistData));
}

export const deleteArtistById = async (id:number) => {
  return await apiRequest(api.delete(`/artist/${id}`))
}
