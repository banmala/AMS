import { IArtist } from "@/@types/artist.type";
import { IMusic } from "@/@types/music.type";
import { useAppDispatch, useAppSelector } from "@/store"
import { fetchArtistById } from "@/store/slices/artist.slice";
import { fetchMusicByArtist } from "@/store/slices/music.slice";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

enum GenderEnum {
    m="Male",
    f="Female",
    p="Others"
}
export default function ArtistDetail () {
    const { artistId } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const artistData = useAppSelector(store=>store.artist.detail)
    const musicList = useAppSelector(store=>store.music.data.items)
    useEffect(()=>{
        if(artistId){
            dispatch(fetchArtistById(+artistId))
        }else{
            navigate("/artist")
        }
    },[])
    useEffect(()=>{
        if(artistId){
            dispatch(fetchMusicByArtist(+artistId))
        }
    },[artistData])

    return (
        <div className="min-h-[500px] flex items-center justify-between">
            <ArtistInfoCard data={artistData} musicList={musicList}/>
        </div>
    )
}

const ArtistInfoCard = ({ data, musicList }: { data?: IArtist; musicList?: IMusic[] }) => {
    return (
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{data?.name}</h2>
        <div>
          <p className="text-gray-600">
            Gender: <span className="font-semibold">{data?.gender ? GenderEnum[data.gender as unknown as keyof typeof  GenderEnum] : "N/A"}</span>
          </p>
          <p className="text-gray-600">
            Date of Birth:{" "}
            <span className="font-semibold">
              {data?.dob ? new Date(data.dob).toISOString().split("T")[0] : "N/A"}
            </span>
          </p>
          <p className="text-gray-600">
            Address: <span className="font-semibold">{data?.address || "N/A"}</span>
          </p>
          <p className="text-gray-600">
            Number of Albums Released: <span className="font-semibold">{data?.no_of_albums_released || 0}</span>
          </p>
          <p className="text-gray-600">
            First Released Year:{" "}
            <span className="font-semibold">{data?.first_release_year ? new Date(data.first_release_year).getFullYear() : "N/A"}</span>
          </p>
        </div>
  
        {musicList && musicList.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mt-4">Artist's Works:</h2>
            {musicList.map((ml,key) => (
              <Link key={ml.id} to={`/musicDetail/${ml.id}`}>
                <p className="font-semibold">{key+1+" : "}<span className="text-blue-800">{ml.title}</span></p>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };
