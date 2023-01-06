import { apiHelper } from "../utils/helpers";

export default {
  addDate({ userId, date }: { userId: number; date: number }) {
    return apiHelper.put(`/attendant/${userId}`, {
      date,
    });
  }
};
