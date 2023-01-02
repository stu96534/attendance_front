<template>
  <div class="container py-4 mt-2">
    <div class="column">
      <button type="button" class="btn btn-success btn-lg" @click="addUser">
        新增員工
      </button>
    </div>

    <div class="column mt-4">
      <Suspense>
        <template #default>
          <ul class="list-group">
            <UsersList
              v-for="user in users"
              :key="user['userId']"
              :initial-user="user"
            />
          </ul>
        </template>

        <template #fallback>
          <p>Loadind....</p>
        </template>
      </Suspense>

      <div class="d-flex justify-content-center mt-3">
        <Pagination
         v-if="Pages!.length > 1"
          :current-page="currentPage"
          :total-page="Pages"
          :previous-page="prev"
          :next-page="next"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UsersList from "../components/UsersList.vue";
import Pagination from "../components/UsersPagination.vue";
import adminAPI from "../apis/admin";
import { onBeforeRouteUpdate,useRoute } from "vue-router";
import Swal from "sweetalert2";
import { Toast } from "../utils/helpers";

const route = useRoute()

const users = ref([]);
const Pages = ref([]);
const currentPage = ref();
const prev = ref();
const next = ref();


async function fetchUser({ page }: { page: any }) {
  try {
    const response = await adminAPI.getUsers({ page });
    const pagination = response.data.pagination

    users.value = response.data.users;

    Pages.value = pagination.pages;
    currentPage.value = pagination.currentPage;
    prev.value = pagination.prev;
    next.value = pagination.next;
   
  } catch (error) {
    console.log('error', error)
    Toast.fire({
      icon: 'error',
      title: '無法取得使用者資料，請稍後再試'
    })
  }
}

//顯示page頁面的資料
const { page } = route.query
fetchUser({ page: page })

//點擊頁面，顯示該頁面資料
onBeforeRouteUpdate((to, from) => {
  const { page } = to.query
  fetchUser({ page: page })
})

//新增使用者資料，以sweetalert視窗輸入
const addUser = async () => {
  const { value: data } = await Swal.fire({
    title: "輸入你的資料",
    html:
      "name: <input type='text' id='swal-input1' class='swal2-input input-group-sm'>" +
      "email: <input type='email' id='swal-input2' class='swal2-input'>",
    focusConfirm: false,
    inputAttributes: {
      accept: "image/*",
      "aria-label": "Upload your profile picture",
    },
    preConfirm: () => {
      return [
        (document.getElementById("swal-input1") as HTMLInputElement).value,
        (document.getElementById("swal-input2") as HTMLInputElement).value,
      ];
    },
  });

  if (data) {
    await adminAPI
      .addUser({
        name: data[0],
        email: data[1],
      })
      .then((result) => {
        if (result) {
          Swal.fire({
            title: "Success",
            text: "新增成功",
            icon: "success",
          });
        }
      })
      .catch((err) => {
        const errMsg = err.response.data;

        Toast.fire({
          icon: "error",
          title: errMsg.message,
        });
      });
  }
};
</script>
