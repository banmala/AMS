import { IArtist } from "@/@types/artist.type";
import { useAppDispatch, useAppSelector } from "@/store";
import { getArtists } from "@/store/slices/artist.slice";
import { createArtist, fetchArtistById, updateArtist } from "@/store/slices/artist.slice";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { redirect, useNavigate, useParams } from "react-router-dom";

export default function  UpdateArtists () {
  const { artistId } = useParams();
  let detail = useAppSelector(store=>store.artist.detail)
  useEffect(() => {
    if(artistId){
      dispatch(fetchArtistById(+artistId));
    }
    dispatch(getArtists())
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IArtist>();
  
  useEffect(()=>{
    if(detail){
      const dob = new Date(detail?.dob || "")?.toISOString().split("T")[0]
      reset({...detail, dob})
    }
  },[detail])
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(state => state.auth.loading);
  const onSubmit = async (formInput:IArtist) => {
    if(artistId){
      const response = await dispatch(updateArtist({data:formInput, artistId:+artistId}));
      if (response) {
        navigate("/artist");
      }
    }else{
      const response = await dispatch(createArtist(formInput));
      if (response) {
        navigate("/artist");
      }
    }
  };
  return (
    <div className="flex  justify-start flex-col w-4/12 h-max rounded-lg">
      <h1 className="font-nunito text-4xl mt-8 text-center">{artistId?"Edit Artist":"Create New Artist"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="px-4 mx-4">
        {/* Artist name */}
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="name" className="font-nunito text-xl">
            Artist Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Artist name is required" })}
            className="rounded-md h-12 pl-4 focus:border-gray-400 border-2 focus:outline-none text-sm"
            placeholder="Enter your first name"
          />
          {errors.name && (
            <p className="text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* dob */}
        <div className="flex flex-col gap-2 mt-6 mb-6">
          <label htmlFor="dob" className="font-nunito text-xl">
            Date of Birth
          </label>

          <input
            id="dob"
            type="date"
            {...register("dob", { required: "Date of Birth is required" })}
            className="rounded-md h-12 pl-4 focus:border-gray-400 border-2 focus:outline-none text-sm"
            placeholder="Enter your Date of Birth"
          />
          {errors.dob && (
            <p className="text-red-500">{errors.dob.message}</p>
          )}
        </div>

        {/* gender */}
        <div className="flex flex-col gap-2 mt-6 mb-6">
          <label htmlFor="dob" className="font-nunito text-xl">
            Gender
          </label>
          <select 
            id="gender" 
            {...register("gender", { required: "Gender is required" })}
            className="rounded-md h-12 pl-4 focus:border-gray-400 border-2 focus:outline-none text-sm"
          >
            <option selected disabled>Select Gender</option>
            <option value="m">Male</option>
            <option value="f">Female</option>
            <option value="o">Others</option>
          </select>
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}
        </div>

        {/* address */}
        <div className="flex flex-col gap-2 mt-6 mb-6">
          <label htmlFor="address" className="font-nunito text-xl">
            Address
          </label>

          <input
            id="address"
            type="text"
            {...register("address", { required: "Address is required" })}
            className="rounded-md h-12 pl-4 focus:border-gray-400 border-2 focus:outline-none text-sm"
            placeholder="Enter your Address"
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>

        {/* First relese year */}
        <div className="flex flex-col gap-2 mt-6 mb-6">
          <label htmlFor="first_release_year" className="font-nunito text-xl">
            First Released Year
          </label>
          <input
            id="first_release_year"
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            {...register("first_release_year", { 
              required: "Year is required", 
              min: 1900, 
              max: new Date().getFullYear() 
            })}
            className="rounded-md h-12 pl-4 focus:border-gray-400 border-2 focus:outline-none text-sm"
            placeholder="Enter Year"
          />

          {errors.first_release_year && (
            <p className="text-red-500">{errors.first_release_year.message}</p>
          )}
        </div>

        {/* First relese year */}
        <div className="flex flex-col gap-2 mt-6 mb-6">
          <label htmlFor="no_of_albums_released" className="font-nunito text-xl">
            Number of Albums Released
          </label>
          <input
            id="no_of_albums_released"
            type="number"
            defaultValue={0}
            {...register("no_of_albums_released", { 
              required: "Year is required", 
            })}
            className="rounded-md h-12 pl-4 focus:border-gray-400 border-2 focus:outline-none text-sm"
            placeholder="Enter Year"
          />

          {errors.no_of_albums_released && (
            <p className="text-red-500">{errors.no_of_albums_released.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="rounded-xl border-2 px-2 py-1"
          disabled={isSubmitting}
        >
          {loading ? "Updating..." : (artistId?"Edit Artist":"Create New Artist")}
        </button>
      </form>
    </div>
  );
};