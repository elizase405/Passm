import { useState } from "react";
import PasswordCard from "../components/PasswordCard";
import PasswordGenerator from "../components/PasswordGenerator";
import Modal from "../components/Modal";
import useEncryption from "../hooks/useEncryption";

export default function Dashboard() {
  const masterKey = "user";
  const { encrypt, decrypt } = useEncryption(masterKey);
  const [passwords, setPasswords] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddPassword = (account) => {
    const encrypted = encrypt(account.password);
    const newAccount = {
      id: Date.now(),
      ...account,
      password: encrypted,
    };
    setPasswords([...passwords, newAccount]);
  };

  const handleDelete = (id) => {
    setPasswords(passwords.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-[#00ffcc] mb-4">
          SecurePass Dashboard
        </h1>
        <button onClick={() => setShowModal(true)} className="btn mb-4">
          + Add Password
        </button>

        <div className="flex flex-wrap justify-center gap-4">
          {passwords.length === 0 ? (
            <p className="text-gray-400">No passwords stored yet.</p>
          ) : (
            passwords.map((p) => (
              <PasswordCard
                key={p.id}
                account={{ ...p, password: decrypt(p.password) }}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>

        <div id="generator">
          <PasswordGenerator
            onGenerate={(newPass) => navigator.clipboard.writeText(newPass)}
          />
        </div>

        {showModal && (
          <Modal onClose={() => setShowModal(false)} onSave={handleAddPassword} />
        )}
      </div>
    </div>
  );
}
