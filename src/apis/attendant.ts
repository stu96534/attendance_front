import { apiHelper } from "../utils/helpers";

export default {
  //打卡功能
  clockIn({ userId, date }: { userId: number; date: number }) {
    return apiHelper.post(`/attendant/${userId}`, {
      date,
    });
  },
  clockOut({ userId, date }: { userId: number; date: number }) {
    return apiHelper.put(`/attendant/${userId}`, {
      date,
    });
  },
  getTodayAtt({ userId, date }: { userId: number; date: number }) {
    return apiHelper.get(`/attendant/${userId}/${date}`);
  }
};
