import axios from "axios";

const instance = axios.create({
  baseURL: "https://passm-ajf4.vercel.app/api",
  withCredentials: true, // IMPORTANT to send/receive cookies
});

export default instance;
