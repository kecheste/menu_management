import axios from "axios";

const api = axios.create({
  baseURL: "https://menu-management-api-voxp.onrender.com",
  // baseURL: "http://localhost:5000",
  withCredentials: true,
});

export default api;
