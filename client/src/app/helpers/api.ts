import axios from "axios";

const api = axios.create({
  baseURL: "https://menu-management-chi.vercel.app/",
  withCredentials: true,
});

export default api;
