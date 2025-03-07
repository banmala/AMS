import Table from "@/components/Table";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteArtist, getArtists } from "@/store/slices/artist.slice";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Artists () {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(state => state.artist.loading);
    const artistData = useAppSelector(state => state.artist.data.items);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getArtists());
    }, []);
    const onDelete = async(id: number) => {
      await dispatch(deleteArtist(id)).unwrap();
      dispatch(getArtists()); 
    };
    console.log(" artistData: ", artistData)
    const artistColumns = artistData?.length > 0 ? Object.keys(artistData[0]).filter(key => key !== "id")  : [];
    return (
      <div className="p-6">
        <div className="flex items-center mb-4 gap-8">
          <h1 className="text-2xl font-semibold">Artist Table</h1>
            <Link to="/updateArtists">
            <button 
              onClick={(event)=>{event.stopPropagation();}} 
              className="bg-blue-300 hover:bg-blue-500 px-3 py-1 rounded-md"
            >Create New Artist</button>
            </Link>
        </div>
        {loading ?(<>Loading...</>):
            (artistData?.length==0?"No data found of artists.":
            <Table 
                columns={artistColumns}
                data={artistData} 
                onDetail={(id)=>{navigate(`/artistDetail/${id}`)}}
                onDelete={onDelete}
                onEdit={(id)=>navigate(`/updateArtists/${id}`)}
            />)}
      </div>
    );
}