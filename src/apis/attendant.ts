import { apiHelper } from "../utils/helpers";

export default {
  addDate({ date, userId }: { date: string, userId: number}) {
    return apiHelper.post(`/attendant/${userId}`, {
      date
    });
  },
};