import { useAppDispatch } from "@/store";
import { logoutUser } from "@/store/slices/auth.slice";
import { Link, redirect } from "react-router-dom";


export default function  Header ()  {
    const dispatch = useAppDispatch();
    return (
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            AMS
          </Link>
  
          {/* Navigation Links */}
          <nav className="flex space-x-6">
            <Link to="/music" className="text-gray-700 hover:text-blue-500">
              Musics
            </Link>
            <Link to="/artist" className="text-gray-700 hover:text-blue-500">
              Artists
            </Link>
            <Link to="/user" className="text-gray-700 hover:text-blue-500">
              Users
            </Link>
          </nav>
  
          <div className="flex space-x-4">
            <button 
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white"
              onClick={()=>{dispatch(logoutUser());redirect("/auth/login")}}
            >
              Logout
            </button>
          </div>
        </div>
      </header>
    );
};