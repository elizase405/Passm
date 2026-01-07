// src/hooks/useEncryption.js
import CryptoJS from "crypto-js";

export default function useEncryption(masterKey) {
  const encrypt = (text) => {
    return CryptoJS.AES.encrypt(text, masterKey).toString();
  };

  const decrypt = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, masterKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  return { encrypt, decrypt };
}
