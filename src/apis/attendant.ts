import { apiHelper } from "../utils/helpers";

export default {
  //打卡功能
  addDate({ userId, date }: { userId: number; date: number }) {
    return apiHelper.put(`/attendant/${userId}`, {
      date,
    });
  }
};
