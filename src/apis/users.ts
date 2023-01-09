import { apiHelper } from '../utils/helpers'


export default {
   //取得登入員工資料
   getCurrentUser() {
      return apiHelper.get(`/current_user`)
   },
   //修改密碼功能
   editCurrentUser({ userId, newData }: { userId: number, newData: object }) {
      return apiHelper.put(`/current_user/${userId}`, newData)
   }
}