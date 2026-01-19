// src/components/Modal.jsx
import { useForm } from "react-hook-form";

export default function Modal({ onClose, onSave }) {
  const { register, handleSubmit, formState: { errors },} = useForm();

  const onSubmit = (data) => {
    onSave(data); // { site, username, password }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50" onClick={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} onClick={(e) => e.stopPropagation()} className="relative card w-96 border border-[#00ffcc]/30" >
        <button type="button" onClick={onClose} className="absolute top-6 right-3 text-[#0099ff] text-xl hover:opacity-70 transition" >
          ✕
        </button>

        <h2 className="text-xl text-[#0099ff] font-semibold mb-4">Add New Password</h2>

        {/* Site Name */}
        <input type="text" placeholder="Site Name" {...register("site", { required: "Site name is required" })} className="bg-blue-300/10 p-2 rounded-md outline-none w-full mb-3 text-sm" />
        {errors.site && ( <p className="text-red-400 text-xs mb-2">{errors.site.message}</p>)}

        {/* Username */}
        <input type="text" placeholder="Username" {...register("username", { required: "Username is required" })} className="bg-blue-300/10 p-2 rounded-md outline-none w-full mb-3 text-sm" />
        {errors.username && (<p className="text-red-400 text-xs mb-2">{errors.username.message}</p>)}

        {/* Password */}
        <input type="password" placeholder="Password"
          {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters",},
          })}
          className="bg-blue-300/10 p-2 rounded-md outline-none w-full mb-1 text-sm"
        />
        {errors.password && (<p className="text-red-400 text-xs mb-2">{errors.password.message}</p>)}

        <button type="submit" className="btn w-full mt-2">
          Save
        </button>
      </form>
    </div>
  );
}
