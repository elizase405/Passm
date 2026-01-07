// src/components/PasswordGenerator.jsx
import { useState } from "react";

export default function PasswordGenerator({ onGenerate }) {
  const [length, setLength] = useState(12);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" +
      (includeSymbols ? "!@#$%^&*()_+" : "");
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    onGenerate(pass);
  };

  return (
    <div className="card w-full md:w-80 mt-4">
      <h3 className="text-[#00ffcc] font-semibold mb-2 text-center">
        Password Generator
      </h3>
      <div className="flex flex-col gap-2">
        <label className="flex justify-between items-center">
          Length:
          <input
            type="number"
            min="6"
            max="32"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="bg-transparent border border-white/10 p-1 rounded w-16 text-center"
          />
        </label>

        <label className="flex justify-between items-center">
          Include Symbols:
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
        </label>

        <button onClick={generatePassword} className="btn w-full mt-2">
          Generate
        </button>
      </div>
    </div>
  );
}
