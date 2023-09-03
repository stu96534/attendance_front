<template>
  <div class="container mt-4 col-sm-6">
    <div class="card card-body">
      <form class="d-block" @submit.prevent.stop="handleSubmit">
        <div class="text-center justify-content-center ">
          <h1 class="h3 mt-4 font-weight-normal fs-1">帳號管理</h1>
        </div>

        <div class="form-label-group  mt-3 d-flex justify-content-evenly align-items-center fs-5">
          <label for="email" class="label-name w-25 text-center ">帳號</label>
          <div class="input w-50">
            <input id="email" v-model="email" name="email" type="email" class="form-control text-dark"
              autocomplete="username" autofocus disabled />
          </div>
        </div>

        <div class="form-label-group mt-4 d-flex justify-content-evenly align-items-center fs-5">
          <label for="password" class="label-name w-25 text-center">原密碼</label>

          <div class="input w-50 d-flex">

            <input id="password" v-model="password" name="password" type="password" class="form-control"
              placeholder="Password" autocomplete="current-password" required />

            <i class="bi align-self-center bi-eye-slash" @click="togglePassword($event)"></i>

          </div>

        </div>

        <div class="form-label-group mt-4 d-flex justify-content-evenly align-items-center fs-5">
          <label for="newPassword" class="label-name w-25 text-center">新密碼</label>
          <div class="input w-50 d-flex">
            <input id="newPassword" v-model="newPassword" name="newPassword" type="password" class="form-control"
              placeholder="newPassword" autocomplete="current-password" required />

            <i class="bi align-self-center bi-eye-slash" @click="togglePassword($event)"></i>
          </div>
        </div>

        <div class="form-label-group mt-4 d-flex justify-content-evenly align-items-center fs-5">
          <label for="checkPassword" class="label-name w-25 text-center">確認密碼</label>
          <div class="input w-50 d-flex">
            <input id="checkPassword" v-model="checkPassword" name="checkPassword" type="password" class="form-control"
              placeholder="checkPassword" autocomplete="current-password" required />

            <i class="bi align-self-center bi-eye-slash" @click="togglePassword($event)"></i>
          </div>
        </div>

        <div class="d-grid justify-content-center align-self-center mt-5">
          <button class="btn btn-lg btn-primary btn-block" type="submit" :disabled="isProcessing">
            更新
          </button>
        </div>

        <p class="mt-5 mb-3 text-muted text-center">&copy; 2022-{{ nowYear }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Swal from "sweetalert2";
import usersAPI from "../apis/users";
import { Toast, Loading } from "../utils/helpers"
import { useRouter } from "vue-router";
import { useAuthUserStore } from "../stores/auth-user";

const router = useRouter();
const authUserStore = useAuthUserStore();
const nowYear = new Date().getFullYear()
const currentUser = computed(() => authUserStore.currentUser);
const email = ref(currentUser.value.email
);
const password = ref("");
const newPassword = ref("");
const checkPassword = ref("");
const isProcessing = ref(false)


// 密碼欄位顯示
const togglePassword = function (event: any) {

  const target = event.target

  const passwordElment = target.previousSibling

  const type = passwordElment.type === 'password' ? 'text' : 'password'

  passwordElment.type = type

  if (type === 'text') {
    target.classList.replace('bi-eye-slash', 'bi-eye')
  } else {
    target.classList.replace('bi-eye', 'bi-eye-slash')
  }
}


// 送出表格按鈕
const handleSubmit = async () => {
  try {



    //欄位錯誤判斷
    if (!email.value.trim() || !password.value.trim() || !newPassword.value.trim() || !checkPassword.value.trim()) {

      await Loading.fire({})

      Toast.fire({
        icon: 'warning',
        title: '請輸入所有欄位'
      })

      return
    } else if (newPassword.value.trim().length < 6 || newPassword.value.trim().length > 12) {

      await Loading.fire({})

      newPassword.value = ''
      checkPassword.value = ''

      Toast.fire({
        icon: 'warning',
        title: '密碼長度需為6~12字元'
      })
      return
    } else if (newPassword.value.length !== checkPassword.value.length) {

      await Loading.fire({})

      checkPassword.value = ''
      Toast.fire({
        icon: 'warning',
        title: '兩次密碼輸入不同'
      })
      return
    }

    //傳送資料將submit按鈕disable，以防資料多次傳送
    isProcessing.value = true

    //取得欄位資料
    const newData = {
      email: email.value,
      password: password.value,
      newPassword: newPassword.value,
      checkPassword: checkPassword.value
    }

    //傳送需更新的資料
    const { data } = await usersAPI.editCurrentUser({
      userId: currentUser.value.id,
      newData
    })

    if (data.status === 'error') {
      throw new Error(data.message)
    }

    await Loading.fire({
      timer: 1300
    })

    Toast.fire({
      icon: 'success',
      title: '密碼已更新'
    })

    password.value = ''
    newPassword.value = ''
    checkPassword.value = ''

    isProcessing.value = false

    router.push('/')

  } catch (err: any) {
    const errMsg = err.response.data;

    await Loading.fire({
      timer: 1300
    })

    Toast.fire({
      icon: 'error',
      title: errMsg.message
    })

    isProcessing.value = false
  }
};
</script>

<style>
form i {
  margin-left: -30px;
  cursor: pointer;
}

@media (max-width: 820px) {
  .label-name {
    font-size: 15px !important;
  }
}

@media (max-width: 400px) {
  .label-name {
    font-size: 15px !important;
  }
}
</style>
