import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import AuthBorder from "../components/AuthBorder";
import { CiUser } from "react-icons/ci";
import { GiPadlock } from "react-icons/gi";
import Alert from "./Alert";

export default function Register() {
  const [ msg, setMsg ] = useState("");
  const { register, reset, watch, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({ defaultValues: { username: "", password: "" } });
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", data);
      console.log("Login Successful: ", res.data);
      setMsg(res.data.message);
      reset()
    } catch (err) {
      setMsg(err.response?.data?.message || err.message);
      console.log(msg)
      setTimeout(() => setMsg(""), 3000);
      setTimeout(() => reset(), 3000);
    }
  };

  return (
    <div className='flex justify-center items-center w-full h-full'>
      {isSubmitSuccessful && <Alert msg={msg} />}
        <div className='flex justify-center items-center relative w-3/4 h-3/4'>
          {/* border design */}
          <AuthBorder />
          <form onSubmit={handleSubmit(onSubmit)} action="" className="w-full flex flex-col justify-center items-center space-y-4">
            <h1 className='uppercase text-blue-300 text-2xl text-center'>Register</h1>
            <div className="w-full flex flex-col items-center">
              <input type="text" name="username" placeholder="Username" {...register("username", { required: "Username is required" })} className="bg-blue-300/10 px-9 py-2 rounded-md w-1/3 outline-none focus:border-blue-300 focus:border-1" />
              <span className="absolute top-32.5 left-80 text-blue-300"><CiUser size="30" /></span>
              <div className="w-full absolute -top-33 -right-40">
                {errors.username && <Alert msg={errors.username.message} />}
              </div>
            </div>
            <div className="w-full flex flex-col items-center">
              <input type="password" name="password" placeholder="Password" value={password} {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters long" } })} className="bg-blue-300/10 px-9 py-2 rounded-md w-1/3 outline-none focus:border-blue-300 focus:border-1 " />
              <span className="absolute top-47 left-80.5 text-blue-300"><GiPadlock size="25" /></span>
              <div className="w-full absolute -top-18 -right-40">
                {errors.password && <Alert msg={errors.password.message} />}
              </div>
            </div>
            <button disabled={isSubmitting} type="submit" className="btn w-1/3">{isSubmitting ? "Submiting..." : "Submit"}</button>
            <p>Already have an account? <a href="/login" className="text-blue-300 hover:underline">Login</a></p>
          </form>
        </div>
    </div>
  );
}
