import axios from "axios";

export const request = axios.create({
  baseURL: "https://www.24h.com.vn/",
});

export const get = async (path, option = {}) => {
  const response = await request.get(path, option);
  return response.data;
};

export const post = async (path, option = {}) => {
  const response = await request.post(path, option);
  return response.status;
};
