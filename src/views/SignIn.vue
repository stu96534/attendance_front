<template>
  <div class="container py-5">
    <div class="card card-body mx-auto d-flex">
      <form class="w-100" @submit.prevent.stop="handleSubmit">
        <div class="text-center mb-4">
          <h1 class="h3 mb-3 mt-4 font-weight-normal fs-1">Login</h1>
        </div>

        <div class="form-label-group mb-3 ms-4 mt-5 d-flex align-items-center fs-5">
          <label for="account" class="me-5">Account </label>
          <div class="input">
            <input id="account" v-model="account" name="account" type="account" class="form-control" placeholder="account"
              autocomplete="username" required autofocus />
          </div>
        </div>

        <div class="form-label-group mb-5 mt-4 ms-2 d-flex align-items-center fs-5">
          <label for="password" class="me-5">Password</label>
          <div class="input">
            <input id="password" v-model="password" name="password" type="password" class="form-control"
              placeholder="Password" autocomplete="current-password" required />
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
import { Toast } from "./../utils/helpers";
import { useStore } from "vuex"


const router = useRouter();
const account = ref("");
const password = ref("");
const store = useStore();
const nowYear = new Date().getFullYear()
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
    store.commit('setCurrentUser', data.user)

    //轉址到主頁面
    router.push("/mainpage");

  } catch (err: any) {

    const errMsg = err.response.data;

    Toast.fire({
      icon: 'error',
      title: errMsg.message,
    })

    isProcessing.value = false

  }
};
</script>

<style>
.card {
  width: 600px;
}

.input {
  width: 400px;
}
</style>
