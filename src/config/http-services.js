import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const httpService = axios.create({
  baseURL: BASE_URL,
});

// 1
httpService.interceptors.request.use((config) => {
  // const token = localStorage.getItem("survey_register");
  config.headers["Content-Type"] = "application/json";
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});
