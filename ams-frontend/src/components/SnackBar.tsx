import { useAppDispatch, useAppSelector } from "@/store";
import { removeSnackbar } from "@/store/slices/snackbar.slice";
import { useEffect } from "react";

const Snackbar: React.FC= ({ }) => {
    const dispatch = useAppDispatch();
    const {showSnackbar, message} = useAppSelector(store=>store.snackbar)
    useEffect(() => {
        if(showSnackbar){
            setTimeout(()=>{
                dispatch(removeSnackbar()) 
            },5000);
        }
    }, [showSnackbar]);
  return (
    <>
        {showSnackbar && 
            <div
                className={`fixed bottom-5 right-5 px-4 py-2 rounded-lg bg-white border-gray-100 border-2 shadow-xl flex items-center space-x-2 transition-transform duration-300 transform translate-y-0 opacity-100 z-[9999]`}
            >
                <span>{message}</span>
                <button className="text-black font-bold" onClick={()=>dispatch(removeSnackbar())}>
                    x
                </button>
            </div>
        }
    </>
  );
};

export default Snackbar;
