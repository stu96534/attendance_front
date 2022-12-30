import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
 getCurrentUser () {
    return apiHelper.get(`/current_user`)
 },
  editCurrentUser({ userId, newData}: { userId: number, newData: object }) {
    return apiHelper.put(`/current_user/${userId}`, newData)
 }
}