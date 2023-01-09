import { apiHelper } from './../utils/helpers'

export default {
//登入功能
  signIn({ email, password } : { email: string, password: string}) {
    return apiHelper.post('/users/signin', {
      email,
      password
    })
  }
  
}