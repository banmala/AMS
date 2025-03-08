import Table from "@/components/Table";
import { useAppDispatch, useAppSelector } from "@/store";
import { displaySnackbar } from "@/store/slices/snackbar.slice";
import { deleteMusic, getMusics } from "@/store/slices/music.slice";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Musics () {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(state => state.music.loading);
    const musicData = useAppSelector(state => state.music.data.items);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getMusics());
    }, []);
    const onDelete = async(id: number) => {
      const result = await dispatch(deleteMusic(id)).unwrap();
      if(result){
        dispatch(displaySnackbar("Successfully deleted music"))
      }
      dispatch(getMusics()); 
    };
    const musicColumns = musicData && musicData.length > 0 ? Object.keys(musicData[0]).filter(key => key !== "id")  : [];
    return (
      <div className="p-6">
        <div className="flex items-center mb-4 gap-8">
          <h1 className="text-2xl font-semibold">Music Table</h1>
            <Link to="/updateMusics">
            <button 
              onClick={(event)=>{event.stopPropagation();}} 
              className="bg-blue-300 hover:bg-blue-500 px-3 py-1 rounded-md"
            >Create New Music</button>
            </Link>
        </div>
        {loading?<>Loading...</>:
          (musicData?.length==0?"No data found of artists.":
            <Table 
              columns={musicColumns}
              data={musicData} 
              onDetail={(id)=>{navigate(`/musicDetail/${id}`)}}
              onDelete={onDelete}
              onEdit={(id)=>navigate(`/updateMusics/${id}`)}
            />
          )
        }
      </div>
    );
}