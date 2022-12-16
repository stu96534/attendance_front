<script setup>
import { ref, reactive } from "vue";
const dummyUser = {
  currentUser: {
    id: 1,
    name: "管理者",
    email: "root@example.com",
    image: "https://i.pravatar.cc/300",
    isAdmin: true,
  },
  isAuthenticated: true,
};

const data = reactive({
  currentUser: {
    id: -1,
    name: "",
    email: "",
    image: "",
    isAdmin: false,
  },
  isAuthenticated: false,
});

data.currentUser = {
  ...data.currentUser,
  ...dummyUser.currentUser,
};
data.isAuthenticated = dummyUser.isAuthenticated;
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">鈦鉭出勤</RouterLink>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto mb-2 mb-md-0">
          <RouterLink to="/" class="nav-link fs-5 me-4" aria-current="page" v-if="data.currentUser.isAdmin">Admin
          </RouterLink>

          <template v-if="data.isAuthenticated">
            <RouterLink to="/" class="nav-link fs-5 me-4" aria-current="page">Profile</RouterLink>
            <button type="button" class="btn btn-sm btn-outline-success my-2 my-sm-0 fs-5 me-4">
              登出
            </button>
          </template>

        </div>
      </div>
    </div>
  </nav>
</template>
