<template>
  <div class="container py-4 mt-2">
    <div class="column">
      <button type="button" class="btn btn-success btn-lg" @click="addUser">
        新增員工
      </button>
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
import UsersList from "../components/UsersList.vue";
import Pagination from "../components/UsersPagination.vue";
import Swal from "sweetalert2";

const addUser = async () => {
  const {value: data} = await Swal.fire({
    title: "輸入你的資料",
    html:
      "name: <input type='text' id='swal-input1' class='swal2-input input-group-sm'>" +
      "email: <input type='email' id='swal-input2' class='swal2-input'>" ,
    focusConfirm: false,
    inputAttributes: {
      'accept': 'image/*',
      'aria-label': 'Upload your profile picture'
    },
    preConfirm: () => {

      return [
        (document.getElementById("swal-input1") as HTMLInputElement).value,
        (document.getElementById("swal-input2") as HTMLInputElement).value,
      ];
    },
  });

if (data) {
console.log(123)
}
}
  

</script>
