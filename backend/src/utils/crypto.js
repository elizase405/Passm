// src/utils/crypto.js
import crypto from "crypto";

const algorithm = "aes-256-cbc";
const ivLength = 16;

const getKey = () => {
  if (!process.env.ENCRYPTION_KEY) {
    throw new Error("ENCRYPTION_KEY missing");
  }

  const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");

  if (key.length !== 32) {
    throw new Error(
      `Invalid key length: ${key.length} bytes (must be 32)`
    );
  }

  return key;
};

export const encrypt = (text) => {
  const iv = crypto.randomBytes(ivLength);

  const cipher = crypto.createCipheriv(
    algorithm,
    getKey(),
    iv
  );

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`;
};

export const decrypt = (encryptedText) => {
  const [ivHex, encrypted] = encryptedText.split(":");

  const iv = Buffer.from(ivHex, "hex");

  if (iv.length !== ivLength) {
    throw new Error("Invalid IV length");
  }

  const decipher = crypto.createDecipheriv(
    algorithm,
    getKey(),
    iv
  );

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
