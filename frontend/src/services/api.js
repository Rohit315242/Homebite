import axios from "axios";

const api = axios.create({
  baseURL: "https://homebite-backend-lnkr.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (
    token &&
    !config.url.includes("/login") &&
    !config.url.includes("/register")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;