import { UserRegisterInputData } from "@/api/auth.api";
import { useAppDispatch, useAppSelector } from "@/store";
import { registerUser } from "@/store/slices/auth.slice";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function  Register () {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterInputData>();
  const navigate = useNavigate();
  
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.auth.loading);
  const onSubmit = async (formInput:UserRegisterInputData) => {
    await dispatch(registerUser(formInput));
    navigate("/auth/login")
  };

  return (
    <div className="shadow-lg border-gray-100 border-2  flex  justify-start flex-col w-4/12 h-max rounded-lg">
      <h1 className="font-nunito text-4xl mt-8 text-center">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="px-4 mx-4">
        {/* First Name */}
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="first_name" className="font-nunito text-xl">
            First Name
          </label>

          <input
            id="first_name"
            type="text"
            {...register("first_name", { required: "First Name is required" })}
            className="rounded-md h-12 pl-4 focus:border-gray-400 border-2 focus:outline-none text-sm"
            placeholder="Enter your first name"
          />
          {errors.first_name && (
            <p className="text-red-500">{errors.first_name.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="last_name" className="font-nunito text-xl">
            last Name
          </label>

          <input
            id="last_name"
            type="text"
            {...register("last_name", { required: "Last Name is required" })}
            className="rounded-md h-12 pl-4 focus:border-gray-400 border-2 focus:outline-none text-sm"
            placeholder="Enter your last name"
          />
          {errors.last_name && (
            <p className="text-red-500">{errors.last_name.message}</p>
          )}
        </div>
        
        {/* Email */}
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
        {/* Password */}
        <div className="flex flex-col gap-2 mt-6 mb-6">
          <label htmlFor="password" className="font-nunito text-xl">
            Password
          </label>

          <input
            id="password"
            type="text"
            {...register("password", { required: "Password is required" })}
            className="rounded-md h-12 pl-4 focus:border-gray-400 border-2 focus:outline-none text-sm"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2 mt-6 mb-6">
          <label htmlFor="phone" className="font-nunito text-xl">
            Phone
          </label>

          <input
            id="phone"
            type="text"
            {...register("phone", { required: "Phone is required" })}
            className="rounded-md h-12 pl-4 focus:border-gray-400 border-2 focus:outline-none text-sm"
            placeholder="Enter your Phone"
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
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

        <button
          type="submit"
          className="rounded-xl border-2 px-2 py-1"
          disabled={isSubmitting}
        >
          {loading ? "Logging in..." : "Register"}
        </button>
      </form>

      <button className="mt-lg hover:underline"  onClick={()=>{navigate("/auth/login")}}>
        Already have an account? Login
      </button>
    </div>
  );
};