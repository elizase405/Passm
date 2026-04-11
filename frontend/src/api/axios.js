import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  withCredentials: true, // IMPORTANT to send/receive cookies
});

export default instance;
