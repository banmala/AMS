import { IMusic } from "@/@types/music.type";
import { useAppDispatch, useAppSelector } from "@/store";
import { getArtists } from "@/store/slices/artist.slice";
import { createMusic, fetchMusicById, updateMusic } from "@/store/slices/music.slice";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { redirect, useNavigate, useParams } from "react-router-dom";

export default function  UpdateMusics () {
  const { musicId } = useParams();
  let detail = useAppSelector(store=>store.music.detail)
  const artistList = useAppSelector(store=>store.artist.data.items)
  useEffect(() => {
    if(musicId){
      dispatch(fetchMusicById(+musicId));
    }
    dispatch(getArtists())
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IMusic>();
  
  useEffect(()=>{
    if(detail){
      reset({...detail})
    }
  },[detail])
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(state => state.auth.loading);
  const onSubmit = async (formInput:IMusic) => {
    if(musicId){
      const response = await dispatch(updateMusic({data:formInput, musicId:+musicId}));
      if (response) {
        navigate("/music");
      }
    }else{
      const response = await dispatch(createMusic(formInput));
      if (response) {
        navigate("/music");
      }
    }
  };
  return (
    <div className="flex  justify-start flex-col w-4/12 h-max rounded-lg">
      <h1 className="font-nunito text-4xl mt-8 text-center">{musicId?"Edit Music":"Create New Music"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="px-4 mx-4">
        {/* Music title */}
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="title" className="font-nunito text-xl">
            Music Title
          </label>

          <input
            id="title"
            type="text"
            {...register("title", { required: "Music title is required" })}
            className="rounded-md h-12 pl-4 focus:border-gray-400 border-2 focus:outline-none text-sm"
            placeholder="Enter your first name"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Music Album Name */}
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="album_name" className="font-nunito text-xl">
            Album Name
          </label>

          <input
            id="album_name"
            type="text"
            {...register("album_name", { required: "Album name is required" })}
            className="rounded-md h-12 pl-4 focus:border-gray-400 border-2 focus:outline-none text-sm"
            placeholder="Enter your first name"
          />
          {errors.album_name && (
            <p className="text-red-500">{errors.album_name.message}</p>
          )}
        </div>

        {/* genre */}
        <div className="flex flex-col gap-2 mt-6 mb-6">
          <label htmlFor="dob" className="font-nunito text-xl">
            Genre
          </label>
          <select 
            id="genre" 
            {...register("genre", { required: "Genre is required" })}
            className="rounded-md h-12 pl-4 focus:border-gray-400 border-2 focus:outline-none text-sm"
          >
            <option selected disabled>Select Genre</option>
            <option value="rnb">RNB</option>
            <option value="country">Country</option>
            <option value="classic">Classic</option>
            <option value="rock">Rock</option>
            <option value="jazz">Jazz</option>
          </select>
          {errors.genre && (
            <p className="text-red-500">{errors.genre.message}</p>
          )}
        </div>

        {/* artist */}
        <div className="flex flex-col gap-2 mt-6 mb-6">
          <label htmlFor="dob" className="font-nunito text-xl">
            Artist
          </label>
          <select 
            id="artist" 
            {...register("artist_id", { required: "Artist is required" })}
            className="rounded-md h-12 pl-4 focus:border-gray-400 border-2 focus:outline-none text-sm"
          >
            <option selected disabled>Select Artist</option>
            {artistList && 
              artistList.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))
            }
          </select>
          {errors.artist_id && (
            <p className="text-red-500">{errors.artist_id.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="rounded-xl border-2 px-2 py-1"
          disabled={isSubmitting}
        >
          {loading ? "Updating..." : (musicId?"Edit Music":"Create New Music")}
        </button>
      </form>
    </div>
  );
};