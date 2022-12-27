<template>
  <div class="container py-4 mt-2">
    <div class="column ">
      <button type="button" class="btn btn-success btn-lg">新增員工</button>
    </div>

    <div class="column mt-4">
      <UsersList />
      
      <div class="d-flex justify-content-center">
        <Pagination />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import UsersList from "../components/UsersList.vue"
import Pagination from "../components/UsersPagination.vue"

</script>