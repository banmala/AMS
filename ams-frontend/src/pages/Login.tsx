import { LoginInputData } from "@/api/auth.api";
import { useAppDispatch, useAppSelector } from "@/store";
import { loginUser } from "@/store/slices/auth.slice";
import { displaySnackbar } from "@/store/slices/snackbar.slice";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputData>();
  const navigate = useNavigate();
  const [authenticated,setAuthenticated] = useState(false);

  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading);
  const onSubmit: SubmitHandler<LoginInputData> = async (formInput) => {
    await dispatch(loginUser(formInput));
    setAuthenticated(true)
    // navigate("/dashboard")
    // window.location.reload();
  };

  useEffect(()=>{
    if(authenticated){
      navigate('/dashboard')
    }
  },[authenticated])

  return (
    <div className="shadow-lg border-gray-100 border-2 flex py-5 justify-start flex-col w-4/12 h-max rounded-2xl">
      <h1 className="font-nunito text-4xl text-center">Login</h1>
      {loading && <p>Loading...</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="px-4 mx-4">
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="email" className="font-nunito text-xl">
            Email
          </label>

          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            className="rounded-md h-12 pl-4 focus:border-gray-400 border-2 focus:outline-none text-sm"
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-6 mb-6">
          <label htmlFor="password" className="font-nunito text-xl">
            Password
          </label>

          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className="rounded-md h-12 pl-4 focus:border-gray-400 border-2 focus:outline-none text-sm"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="rounded-xl border-2 px-2 py-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
      {/*TODO*/}
      
      <button className="mt-lg hover:underline" onClick={()=>{navigate("/auth/register")}}>
        Dont have an account? Register
      </button>
    </div>
  );
};

export default Login;
