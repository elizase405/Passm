import { useEffect, useState } from "react";
import PasswordCard from "../components/PasswordCard";
import PasswordGenerator from "../components/PasswordGenerator";
import Modal from "../components/Modal";
import useEncryption from "../hooks/useEncryption";
import axios from "../api/axios";
import ComingSoon from "../components/ComingSoon";

export default function Dashboard() {
  const masterKey = "user";
  const { encrypt, decrypt } = useEncryption(masterKey);
  const [passwords, setPasswords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await axios.get("/password/get-passwords");
        const data = response.data.map((item) => ({
          ...item,
          password: decrypt(item.password),
        }));
        setPasswords(data);
      } catch (err) {
        console.log("Error fetching passwords: ", err);
      }
    };
    fetchPasswords();
  }, [passwords]);

  const handleAddPassword = (account) => {
    try {
      const data = axios.post("/password/save-password", {
        site: account.site,
        username: account.username,
        password: encrypt(account.password)
      });
    } catch (err) {
      console.log("Error saving password: ", err);
    }
  };

  const handleDelete = async (id) => {
  try {
    await axios.delete(`/password/delete-password/${id}`);
    setPasswords(prev => prev.filter(p => p._id !== id));
  } catch (err) {
    console.error("Delete failed:", err);
  }
};


  return (
    <div>
      <div className="p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-400 mb-4">
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
                key={p._id}
                account={{ ...p }}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>

        <div id="generator" onClick={() => setShowComingSoon(true)}>
          <PasswordGenerator
            onGenerate={(newPass) => navigator.clipboard.writeText(newPass)}
          />
        </div>

        {showModal && (
          <Modal onClose={() => setShowModal(false)} onSave={handleAddPassword} />
        )}
        {showComingSoon && (
          <ComingSoon onClose={() => setShowComingSoon(false)} />
        )}
      </div>
    </div>
  );
}
