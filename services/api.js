import axios from "axios";
import { getToken } from "./tokenService";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  const token = await getToken();

  if (token !== null) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const REST_API = {
  LOGIN_URL: "/login",
  REGISTER_URL: "/register",
  LOGOUT_URL: "/logout",
  POST_INDEX_URL: "/posts",
};

export default axiosInstance;
