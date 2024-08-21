import axiosInstance, { REST_API } from "./api";

export const postService = async () => {
  const { data } = await axiosInstance.get(REST_API.POST_INDEX_URL);
  return data;
};
