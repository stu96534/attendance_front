<template>
  <div class="container py-5">
    <div class="card card-body mx-auto d-flex">
      <form class="w-100" @submit.prevent.stop="handleSubmit">
        <div class="text-center mb-4">
          <h1 class="h3 mb-3 mt-4 font-weight-normal fs-1">帳號管理</h1>
        </div>

        <div class="form-label-group mb-5 ms-5 mt-5 d-flex align-items-center fs-5">
          <label for="email" class="me-5">帳號</label>
          <div class="input ">
            <input id="email" v-model="email" name="email" type="email" class="form-control text-dark"  
              autocomplete="username"  autofocus disabled/>
          </div>
        </div>

        <div class="form-label-group mb-5 mt-4 ms-4 d-flex align-items-center fs-5">
          <label for="password" class="me-5">原密碼</label>
          <div class="input">
            <input id="password" v-model="password" name="password" type="password" class="form-control"
              placeholder="Password" autocomplete="current-password" required />
          </div>
        </div>

        <div class="form-label-group mb-5 mt-4 ms-4 d-flex align-items-center fs-5">
          <label for="newPassword" class="me-5">新密碼</label>
          <div class="input">
            <input id="newPassword" v-model="newPassword" name="newPassword" type="password" class="form-control"
              placeholder="newPassword" autocomplete="current-password" required />
          </div>
        </div>

        <div class="form-label-group mb-5 mt-4 ms-2 d-flex align-items-center fs-5">
          <label for="checkPassword" class="me-5">確認密碼</label>
          <div class="input">
            <input id="checkPassword" v-model="checkPassword" name="checkPassword" type="password" class="form-control"
              placeholder="checkPassword" autocomplete="current-password" required />
          </div>
        </div>

        <div class="d-grid justify-content-center align-self-center mt-5">
          <button class="btn btn-lg btn-primary btn-block mb-3" type="submit" :disabled="isProcessing">
            更新
          </button>
        </div>

        <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers"
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const currentUser = computed(() => store.getters.currentUser);
const email = ref(currentUser.value.email
);
const password = ref("");
const newPassword = ref("");
const checkPassword = ref("");
const isProcessing = ref(false)

const handleSubmit = async () => {
  try {


    if (!email.value.trim() || !password.value.trim() || !newPassword.value.trim() || !checkPassword.value.trim()) {
      Toast.fire({
        icon: 'warning',
        title: '請輸入所有欄位'
      })
      return
    } else if (newPassword.value.trim().length < 6 || newPassword.value.trim().length > 12) {
      newPassword.value = ''
      checkPassword.value = ''
      Toast.fire({
        icon: 'warning',
        title: '密碼長度需為6~12字元'
      })
      return
    } else if (newPassword.value.length !== checkPassword.value.length) {
      checkPassword.value = ''
      Toast.fire({
        icon: 'warning',
        title: '兩次密碼輸入不同'
      })
      return
    }

    isProcessing.value = true

    const newData = {
      email: email.value,
      password: password.value,
      newPassword: newPassword.value,
      checkPassword: checkPassword.value
    }

    const { data } = await usersAPI.editCurrentUser({
      userId: currentUser.value.id,
      newData
    })

    if (data.status === 'error') {
      throw new Error(data.message)
    }

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

    Toast.fire({
      icon: 'error',
      title: errMsg.message
    })

    isProcessing.value = false
  }
};
</script>