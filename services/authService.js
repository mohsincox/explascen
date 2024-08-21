import axiosInstance, { REST_API } from "./api";
import { deleteToken, storeToken } from "./tokenService";

export const loginService = async (credentials) => {
  const { data } = await axiosInstance.post(REST_API.LOGIN_URL, credentials);
  await storeToken(data?.token);
};

export const registerService = async (registerInfo) => {
  const { data } = await axiosInstance.post(
    REST_API.REGISTER_URL,
    registerInfo
  );
  await storeToken(data?.token);
};

export const logoutService = async () => {
  await axiosInstance.post(REST_API.LOGOUT_URL, {});
  await deleteToken();
};
