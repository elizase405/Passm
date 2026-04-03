import axios from "axios";

const instance = axios.create({
  baseURL: "https://passm-ajf4.vercel.app/api",
  withCredentials: true, // IMPORTANT to send/receive cookies
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
})
export default instance;
