import { useAppDispatch, useAppSelector } from "@/store";
import { removeSnackbar } from "@/store/slices/snackbar.slice";
import { useEffect } from "react";

const Snackbar: React.FC= ({ }) => {
    const dispatch = useAppDispatch();
    const {showSnackbar, message} = useAppSelector(store=>store.snackbar)
    useEffect(() => {
        setTimeout(()=>{
            dispatch(removeSnackbar) 
        }, 3000);
    }, []);

  return (
    <>
        {showSnackbar && 
        <div
        className={`fixed bottom-5 right-5 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 transition-transform duration-300 transform translate-y-0 opacity-100 `}
        >
        <span>{message}</span>
        <button className="text-white font-bold" onClick={()=>dispatch(removeSnackbar)}>
            ✖
        </button>
        </div>}
    </>
  );
};

export default Snackbar;
