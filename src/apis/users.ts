import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
 getUser () {
    return apiHelper.get(`/current_user`, {
    headers: { Authorization: `Bearer ${ getToken() }` }
  })
 },
  editUser({ userId }: { userId: number }) {
    return apiHelper.put(`/current_user/${userId}`, {
     headers: { Authorization: `Bearer ${getToken()}` }
   })
 }

}