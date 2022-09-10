import * as request from "~/untils/request";

export const weatherDataFeed = async () => {
  try {
    const res = await request.get(`du-bao-thoi-tiet-c568.html`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
