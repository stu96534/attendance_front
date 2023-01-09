import { axiosNoauth } from "../utils/helpers";

export default {
  //取得工作地點
  getLocation() {
    return axiosNoauth.get(`/location`);
  }
};