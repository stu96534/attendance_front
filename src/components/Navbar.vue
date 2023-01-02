<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">鈦鉭出勤</RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto mb-2 mb-md-0">
          <RouterLink
            :to="{ name: 'admin', query: { page: 1 } }"
            class="nav-link fs-5 me-4"
            aria-current="page"
            v-if="currentUser.isAdmin"
            >Admin
          </RouterLink>

          <template v-if="isAuthenticated">
            <RouterLink
              to="/users"
              class="nav-link fs-5 me-4"
              aria-current="page"
              >Setting</RouterLink
            >
            <button
              type="button"
              class="btn btn-sm btn-outline-success my-2 my-sm-0 fs-5 me-4"
              @click="logout"
            >
              登出
            </button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const currentUser = computed(() => store.getters.currentUser);

const isAuthenticated = computed(() => store.getters.isAuthenticated);

const logout = () => {
  store.commit("revokeAuthentication");

  router.push("/signin");
};
</script>
