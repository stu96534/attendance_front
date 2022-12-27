<template>
  <div class="container py-5">
    <div class="column mt-3">
      <button type="button" class="btn btn-success btn-lg">新增員工</button>
    </div>

    <div class="column mt-4">
      <UsersList />
    </div>
  </div>
</template>

<script setup lang="ts">
import UsersList from "../components/UsersList.vue"

</script>