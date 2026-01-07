// src/components/Modal.jsx
import { useState } from "react";

export default function Modal({ onClose, onSave }) {
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ site, username, password });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="card w-96 border border-[#00ffcc]/30"
      >
        <h2 className="text-xl text-[#00ffcc] font-semibold mb-4">
          Add New Password
        </h2>
        <input
          type="text"
          placeholder="Site Name"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-transparent border border-white/20"
        />
        <input
          type="text"
          placeholder="Username / Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-transparent border border-white/20"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-5 p-2 rounded bg-transparent border border-white/20"
        />
        <button type="submit" className="btn w-full">
          Save
        </button>
      </form>
    </div>
  );
}
