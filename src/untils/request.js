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

export const requestWeather2 = axios.create({
  headers: { "Access-Control-Allow-Origin": "*" },
  baseURL: "https://thoitiet.vn/",
});

export const getWeather2 = async (path, option = {}) => {
  const response = await requestWeather2.get(path, option);
  return response.data;
};
