import { apiHelper } from './../utils/helpers'

export default {
//登入功能
  signIn({ account, password }: { account: string, password: string}) {
    return apiHelper.post('/users/signin', {
      account,
      password
    })
  }
  
}