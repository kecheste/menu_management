import axios from "axios";

const api = axios.create({
  baseURL: "https://menu-management-api-voxp.onrender.com",
  withCredentials: true,
});

export default api;
