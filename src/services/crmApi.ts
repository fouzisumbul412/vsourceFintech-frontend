import axios from "axios";

const crmApi = axios.create({
  baseURL: import.meta.env.VITE_CRM_API,
});

crmApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default crmApi;