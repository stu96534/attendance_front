<script setup>
import { ref, reactive } from "vue";

const email = ref("");
const password = ref("");

const handleSubmit = () => {
  const data = JSON.stringify({
    email: this.email,
    password: this.password
  })

  console.log('data', data)
}
</script>

<template>
  <div class="container py-5">
    <div class="card card-body mx-auto d-flex">
      <form class="w-100" @submit.prevent.stop="handleSubmit">
        <div class="text-center mb-4">
          <h1 class="h3 mb-3 mt-4 font-weight-normal fs-1">Login</h1>
        </div>

        <div
          class="form-label-group mb-3 ms-5 mt-5 d-flex align-items-center fs-5"
        >
          <label for="email" class="me-5">Email </label>
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
          class="form-label-group mb-5 mt-4 ms-2 d-flex align-items-center fs-5"
        >
          <label for="password" class="me-5">Password</label>
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

        <div class="d-grid justify-content-center align-self-center mt-5">
          <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
            Submit
          </button>
        </div>

        <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
      </form>
    </div>
  </div>
</template>

<style>
.card {
  width: 600px;
}

.input {
  width: 400px;
}
</style>
