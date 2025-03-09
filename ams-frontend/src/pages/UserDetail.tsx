import { IUser } from "@/@types/auth.type";
import { useAppDispatch, useAppSelector } from "@/store"
import { fetchUserById } from "@/store/slices/user.slice";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

enum GenderEnum {
    m="Male",
    f="Female",
    p="Others"
}
export default function UserDetail () {
    const { userId } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userData = useAppSelector(store=>store.user.detail)
    useEffect(()=>{
        if(userId){
            dispatch(fetchUserById(+userId))
        }else{
            navigate("/user")
        }
    },[])

    return (
        <div className="min-h-[500px] flex items-center justify-between">
            <UserInfoCard data={userData}/>
        </div>
    )
}

const UserInfoCard = ({ data }: { data?: IUser }) => {
    return (
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{data?.first_name+" "+data?.last_name}</h2>
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
                Email: <span className="font-semibold">{data?.email || "N/A"}</span>
            </p>
            <p className="text-gray-600">
                Phone: <span className="font-semibold">{data?.phone || "N/A"}</span>
            </p>
            <p className="text-gray-600">
                Role: <span className="font-semibold">{data?.role || "N/A"}</span>
            </p>
          
        </div>
      </div>
    );
  };
// email, phone role