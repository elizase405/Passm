import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // IMPORTANT to send/receive cookies
});

export default instance;
