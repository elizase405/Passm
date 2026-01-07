// src/components/PasswordCard.jsx
import { useState } from "react";

export default function PasswordCard({ account, onDelete }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="card flex flex-col gap-2 w-full md:w-80 p-4">
      <h3 className="text-lg font-semibold text-[#00ffcc]">{account.site}</h3>
      <p className="text-sm text-gray-400">{account.username}</p>

      <div className="flex justify-between items-center mt-2">
        <input
          type={revealed ? "text" : "password"}
          value={account.password}
          readOnly
          className="bg-transparent text-gray-300 border border-white/10 rounded p-1 w-40 text-center"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setRevealed(!revealed)}
            className="text-sm hover:text-[#00ffcc] transition"
          >
            {revealed ? "Hide" : "Show"}
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(account.password)}
            className="text-sm hover:text-[#00ffcc] transition"
          >
            Copy
          </button>
          <button
            onClick={() => onDelete(account.id)}
            className="text-sm text-red-400 hover:text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
