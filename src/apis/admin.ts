import { apiHelper } from "../utils/helpers";

export default {
  getUsers({ page }: { page: any }) {
    const searchParams = new URLSearchParams({ page })
    return apiHelper.get(`/admin/users?${searchParams.toString()}`);
  },
  unlockUser({ userId }: { userId: number }) {
    return apiHelper.put(`/admin/users/${userId}/unlock`);
  },
  addUser({ name, email }: { name: string; email: string }) {
    return apiHelper.post(`/admin/users`, {
      name,
      email
    });
  },
  getUserAttendant({ month, userId }: { month: any, userId: number }) {
    const searchParams = new URLSearchParams({ month })
    return apiHelper.get(`/admin/users/${userId}/attendant?${searchParams.toString()}`);
  },
  changeLocation({ name }: { name: string }) {
    return apiHelper.put(`/admin/location`, { name });
  }
};
