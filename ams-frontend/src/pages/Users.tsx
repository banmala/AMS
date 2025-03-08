import Table from "@/components/Table";
import { useAppDispatch, useAppSelector } from "@/store";
import { displaySnackbar } from "@/store/slices/snackbar.slice";
import { deleteUser, getUsers } from "@/store/slices/user.slice";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Users () {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(state => state.user.loading);
    const userData = useAppSelector(state => state.user.data.items);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getUsers());
    }, []);
    const onDelete = async(id: number) => {
      const result = await dispatch(deleteUser(id)).unwrap();
      if(result){
        dispatch(displaySnackbar("Successfully deleted user"))
      }
      dispatch(getUsers()); 
    };
    const userColumns = userData.length > 0 ? Object.keys(userData[0]).filter(key => key !== "id")  : [];
    return (
      <div className="p-6">
        <div className="flex items-center mb-4 gap-8">
          <h1 className="text-2xl font-semibold">User Table</h1>
            <Link to="/updateUsers">
            <button 
              onClick={(event)=>{event.stopPropagation();}} 
              className="bg-blue-300 hover:bg-blue-500 px-3 py-1 rounded-md"
            >Create New User</button>
            </Link>
        </div>
        {loading?<>Loading...</>:
          <Table 
            columns={userColumns}
            data={userData} 
            onDetail={(id)=>{navigate(`/userDetail/${id}`)}}
            onDelete={onDelete}
            onEdit={(id)=>navigate(`/updateUsers/${id}`)}
          />}
      </div>
    );
}