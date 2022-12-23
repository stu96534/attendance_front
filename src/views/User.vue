<script setup lang="ts">
import { ref, reactive } from "vue";

const email = ref("");
const password = ref("");
const newPassword = ref("");
const checkPassword = ref("");

const handleSubmit = () => {
  const data = JSON.stringify({
    email: email.value,
    password: password.value,
    newPassword: newPassword.value,
    checkPassword: checkPassword.value
  });

  console.log("data", data);
};
</script>

<template>
  <div class="container py-5">
    <div class="card card-body mx-auto d-flex">
      <form class="w-100" @submit.prevent.stop="handleSubmit">
        <div class="text-center mb-4">
          <h1 class="h3 mb-3 mt-4 font-weight-normal fs-1">帳號管理</h1>
        </div>

        <div
          class="form-label-group mb-5 ms-5 mt-5 d-flex align-items-center fs-5"
        >
          <label for="email" class="me-5">帳號</label>
          <div class="input">
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              class="form-control"
              placeholder="email"
              autocomplete="username"
              required
              autofocus
            />
          </div>
        </div>

        <div
          class="form-label-group mb-5 mt-4 ms-4 d-flex align-items-center fs-5"
        >
          <label for="password" class="me-5">原密碼</label>
          <div class="input">
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              class="form-control"
              placeholder="Password"
              autocomplete="current-password"
              required
            />
          </div>
        </div>

        <div
          class="form-label-group mb-5 mt-4 ms-4 d-flex align-items-center fs-5"
        >
          <label for="newPassword" class="me-5">新密碼</label>
          <div class="input">
            <input
              id="newPassword"
              v-model="newPassword"
              name="newPassword"
              type="password"
              class="form-control"
              placeholder="newPassword"
              autocomplete="current-password"
              required
            />
          </div>
        </div>

        <div
          class="form-label-group mb-5 mt-4 ms-2 d-flex align-items-center fs-5"
        >
          <label for="checkPassword" class="me-5">確認密碼</label>
          <div class="input">
            <input
              id="checkPassword"
              v-model="checkPassword"
              name="checkPassword"
              type="password"
              class="form-control"
              placeholder="checkPassword"
              autocomplete="current-password"
              required
            />
          </div>
        </div>

        <div class="d-grid justify-content-center align-self-center mt-5">
          <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
            更新
          </button>
        </div>

        <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
      </form>
    </div>
  </div>
</template>
