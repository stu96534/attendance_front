<template>
  <div class="container mt-5 col-sm-6">
    <div class="card card-body  d-block">
      <form class="w-100" @submit.prevent.stop="handleSubmit">
        <div class="text-center mb-4">
          <h1 class="h3 mb-3 mt-4 font-weight-normal fs-1">Login</h1>
        </div>

        <div class="form-label-group d-flex mb-3  mt-5  align-items-center justify-content-center fs-5">
          <label for="account" class="label-name w-25 text-center">Account </label>
          <div class="w-75">
            <input id="account" v-model="account" name="account" type="account" class="form-control" placeholder="account"
              autocomplete="username" required autofocus />
          </div>
        </div>

        <div class="form-label-group mb-5 mt-4 d-flex align-items-center justify-content-center fs-5">
          <label for="password" class="label-name w-25 text-center">Password</label>
          <div class="w-75 input d-flex">
            <input id="password" v-model="password" name="password" :type="isHidden ? 'password' : 'text'"
              class="form-control" placeholder="Password" autocomplete="current-password" required />
            <i id="checkEye" :class="[isHidden ? 'bi-eye-slash' : 'bi-eye', 'bi']" @click="isHidden = !isHidden"></i>
          </div>
        </div>

        <div class="d-grid justify-content-center align-self-center mt-5">
          <button class="btn btn-lg btn-primary btn-block mb-3" type="submit" :disabled="isProcessing">
            Submit
          </button>
        </div>

        <p class="mt-5 mb-3 text-muted text-center">&copy; 2022-{{ nowYear }}</p>
      </form>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import authorizationAPI from "./../apis/authorization";
import { Toast, Loading } from "./../utils/helpers";
import { useAuthUserStore } from "../stores/auth-user";


const router = useRouter();
const account = ref("");
const password = ref("");
const authUserStore = useAuthUserStore();
const nowYear = new Date().getFullYear()
const isHidden = ref(true)
let isProcessing = ref(false);


const handleSubmit = async () => {
  try {

    //帳號密碼欄位錯誤判斷
    if (!account.value || !password.value) {
      Toast.fire({
        icon: 'warning',
        title: '請填寫這個欄位。',
      });
      return
    }

    //傳送資料將submit按鈕disable，以防資料多次傳送
    isProcessing.value = true

    //傳送登入的資料
    const { data } = await authorizationAPI
      .signIn({
        account: account.value,
        password: password.value,
      })

    if (data.status === "error") {
      throw new Error(data.message);
    }

    //存入token到localStorage
    localStorage.setItem("token", data.token);

    //存入user資料
    authUserStore.setCurrentUser(data.user)

    //轉址到主頁面
    await Loading.fire({
      timer: 1300
    })

    router.push("/mainpage");


  } catch (err: any) {

    const errMsg = err.response.data;

    await Loading.fire({
      timer: 1300
    })

    Toast.fire({
      icon: 'error',
      title: errMsg.message,
    })



    isProcessing.value = false

  }
};
</script>

<style>
.input {
  width: 400px;
}

@media (max-width: 830px) {
  .label-name {
    font-size: 16px;
  }

  .form-control {
    height: 35px;
    margin-left: 7px;
  }
}

@media (max-width: 300px) {

  .label-name {
    font-size: 12px;
  }

  .form-control {
    width: 90%;
    height: 30px;
    margin-left: 20px;
  }

  .btn-primary {
    font-size: 15px;
  }
}

#checkEye {
  margin-top: 2px;
  margin-left: -30px;
}
</style>
