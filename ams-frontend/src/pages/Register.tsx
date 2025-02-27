import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
}

export default function  Register () {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  
  const onSubmit: SubmitHandler<IFormInput> = (formInput) => {
    console.log("Submitted Data: ",formInput )
  };

  return (
    <div className="bg-teal-200 flex  justify-start flex-col w-4/12 h-max rounded-lg">
      <h1 className="font-nunito text-4xl mt-8 text-center">Login</h1>
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
          className="rounded-xl"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Register"}
        </button>
      </form>
      {/*TODO*/}
      {/* <a
        href="#"
        className="p-4 mx-4 text-sm mb-4 text-teal-700 underline cursor-pointer hover:no-underline"
      >
        Forgot password?
      </a> */}
    </div>
  );
};
