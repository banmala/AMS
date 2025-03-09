import { IArtist } from "@/@types/artist.type";
import { IMusic } from "@/@types/music.type";
import { useAppDispatch, useAppSelector } from "@/store"
import { fetchArtistById } from "@/store/slices/artist.slice";
import { fetchMusicById } from "@/store/slices/music.slice";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function MusicDetail () {
    const { musicId } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const musicData = useAppSelector(store=>store.music.detail)
    const artistInfo = useAppSelector(store=>store.artist.detail)
    useEffect(()=>{
        if(musicId){
            dispatch(fetchMusicById(+musicId))
        }else{
            navigate("/music")
        }
    },[])
    useEffect(()=>{
        if(musicData?.artist_id){
            dispatch(fetchArtistById(musicData.artist_id))
        }
    },[musicData])

    return (
        <div className="min-h-[500px] flex items-center justify-between">
            <MusicInfoCard data={musicData} artistInfo={artistInfo}/>
        </div>
    )
}

const MusicInfoCard = ({ data,artistInfo }:{data?:IMusic,artistInfo?:IArtist}) => {
    return (
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{data?.title}</h2>
        <p className="text-gray-600">Album: <span className="font-semibold">{data?.album_name}</span></p>
        <p className="text-gray-600">Genre: <span className="font-semibold">{data?.genre}</span></p>
        <Link to={`/artistDetail/${artistInfo?.id}`}><p className="text-gray-600">Singer: <span className="font-semibold text-blue-800">{artistInfo?.name}</span></p></Link>
      </div>
    );
  };
  