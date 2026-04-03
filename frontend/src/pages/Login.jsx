import { useState } from "react";
import axios from "../api/axios";
import { useForm } from "react-hook-form";
import AuthBorder from "../components/AuthBorder";
import { CiUser } from "react-icons/ci";
import { GiPadlock } from "react-icons/gi";
import Alert from "./Alert";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [msg, setMsg] = useState("");
  const { register, reset, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { username: "", password: "" },
  });
  const password = watch("password");
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/auth/login", data);

      // Save token
      localStorage.setItem("token", res.data.token);

      // Fetch user immediately
      await fetchUser();

      // Navigate after login
      navigate("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.message || err.message);
      console.log(err.response?.data?.message || err.message);
      setTimeout(() => setMsg(""), 3000);
      setTimeout(() => reset(), 3000);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="mx-auto w-[90%] flex justify-center items-center relative w-3/4 h-3/4">
        <AuthBorder />
        <form onSubmit={handleSubmit(onSubmit)} className="absolute w-full h-full">
          <div className="w-full h-full flex flex-col justify-center items-center">
            {msg && <Alert msg={msg} />}
            <h1 className="uppercase text-blue-300 text-xl sm:text-2xl text-center mb-6">Login</h1>

            <div className="relative w-4/6 md:w-3/7 lg:w-1/3 flex flex-col items-center">
              <input
                type="text"
                name="username"
                placeholder="Username"
                {...register("username", { required: "Username is required" })}
                className="w-full bg-blue-300/10 px-10 py-2 rounded-md outline-none focus:border-blue-300 focus:border-1 mb-6"
              />
              <span className="absolute left-1 mt-2 text-blue-300">
                <CiUser size="23" />
              </span>
            </div>
            {errors.username && <Alert msg={errors.username.message} />}

            <div className="relative w-4/6 md:w-3/7 lg:w-1/3 flex flex-col items-center">
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters long" },
                })}
                className="w-full bg-blue-300/10 px-10 py-2 rounded-md outline-none focus:border-blue-300 focus:border-1 mb-5 sm:mb-6"
              />
              <span className="absolute left-1 mt-2.5 text-blue-300">
                <GiPadlock size="21" />
              </span>
            </div>
            {errors.password && <Alert msg={errors.password.message} />}

            <button
              disabled={isSubmitting}
              type="submit"
              className="btn w-1/2 md:w-1/3 lg:w-1/4 mb-6"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            <p>
              Don't have an account? <a href="/register" className="text-blue-300 hover:underline">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}