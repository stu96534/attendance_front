import { apiHelper } from "../utils/helpers";

export default {
  //取得員工資料
  getUsers({ page }: { page: any }) {
    const searchParams = new URLSearchParams({ page })
    return apiHelper.get(`/admin/users?${searchParams.toString()}`);
  },
  //員工解鎖功能
  unlockUser({ userId }: { userId: number }) {
    return apiHelper.put(`/admin/users/${userId}/unlock`);
  },
  //新增員工
  addUser({ name, account, email }: { name: string, account: string, email: string }) {
    return apiHelper.post(`/admin/users`, {
      name,
      account,
      email
    });
  },
  //取得員工出勤紀錄
  getUserAttendant({ month, userId, page, year }: { month: any, userId: number, page: any, year: any }) {
    const searchParams = new URLSearchParams({ month, page, year })
    return apiHelper.get(`/admin/users/${userId}/attendants?${searchParams.toString()}`);
  },
  //改變工作地點功能
  changeLocation({ name }: { name: string }) {
    return apiHelper.put(`/admin/location`, { name });
  },
  //改變出缺勤功能
  changeAttendant({ id }: { id: number }) {
    return apiHelper.put(`/admin/changeAttendant`, { id });
  }
};
