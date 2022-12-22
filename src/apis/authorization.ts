import { apiHelper } from './../utils/helpers'

export default {

  signIn({ email, password } : { email: string, password: string}) {
    return apiHelper.post('/users/signin', {
      email,
      password
    })
  }
  
}