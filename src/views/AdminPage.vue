<template>
  <div class="container py-4 mt-2">
    <div class="column">
      <!-- 新增員工按鈕 -->
      <button type="button" class="btn btn-success btn-lg" @click="addUser">
        新增員工
      </button>
     
    </div>

    <div class="column mt-4">
      <!-- 員工清單 -->
      <Suspense>
        <template #default>
          <ul class="list-group">
            <UsersList v-for="user in users" :key="user['userId']" :initial-user="user" />
          </ul>
        </template>

        <template #fallback>
          <p>Loadind....</p>
        </template>
      </Suspense>

      <!-- 頁碼 -->
      <div class="d-flex justify-content-center mt-3">
        <Pagination v-if="Pages!.length > 1" :current-page="currentPage" :total-page="Pages" :previous-page="prev"
          :next-page="next" :routeName="'admin'"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UsersList from "../components/UsersList.vue";
import Pagination from "../components/Pagination.vue";
import adminAPI from "../apis/admin";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import Swal from "sweetalert2";
import { Toast } from "../utils/helpers";

const route = useRoute();

const users = ref([]);
const Pages = ref([]);
const currentPage = ref();
const prev = ref();
const next = ref();

//取得所有員工資料
async function fetchUser({ page }: { page: any }) {
  try {

    //取得api資料
    const response = await adminAPI.getUsers({ page });

    //取得員工資料
    users.value = response.data.users;

    //取得頁碼資料
    const pagination = response.data.pagination;

    Pages.value = pagination.pages;
    currentPage.value = pagination.currentPage;
    prev.value = pagination.prev;
    next.value = pagination.next;

  } catch (error) {
    //錯誤訊息
    Toast.fire({
      icon: "error",
      title: "無法取得使用者資料，請稍後再試",
    });
  }
}

//顯示page頁面的資料
const { page } = route.query;
fetchUser({ page: page });

//點擊頁面，顯示該頁面資料
onBeforeRouteUpdate((to, from) => {
  const { page } = to.query;
  fetchUser({ page: page });
});

//新增使用者資料，以sweetalert視窗輸入
const addUser = async () => {
  try {
    const { value: data } = await Swal.fire({
      title: "輸入你的資料",
      html:
        "name: <input type='text' id='swal-input1' class='swal2-input input-group-sm'>" +
        "account: <input type='account' id='swal-input2' class='swal2-input'>" +
        "email: <input type='email' id='swal-input3' class='swal2-input'>",
      focusConfirm: false,
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
      preConfirm: () => {
        return [
          (document.getElementById("swal-input1") as HTMLInputElement).value,
          (document.getElementById("swal-input2") as HTMLInputElement).value,
          (document.getElementById("swal-input3") as HTMLInputElement).value,
        ];
      },
    });

    if (data) {
      const user = await adminAPI
        .addUser({
          name: data[0],
          account: data[1],
          email: data[2],
        })

      if (user) {
        Swal.fire({
          title: "Success",
          text: "新增成功",
          icon: "success",
          showConfirmButton: false,
          timer: 1300,
        });
      }

    }
  } catch (err: any) {
    const errMsg = err.response.data;

        Toast.fire({
          icon: "error",
          title: errMsg.message,
        });
  }
  
};

// 選擇工作地點
const chooseLocation = async () => {
  const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        "鈦坦高雄分公司": "鈦坦高雄分公司",
        "當前位置": "當前位置(測試用)"
      });
    }, 1000);
  });

  const { value: location } = await Swal.fire({
    title: "Select location",
    input: "radio",
    inputOptions: inputOptions,
    showConfirmButton: false
  });

  if (location) {
    Swal.fire({ html: `You selected: ${location}` });
    await adminAPI.changeLocation({ name: location })
      .then((result) => {
        if (result) {
          Swal.fire({
            title: "Success",
            text: "選擇成功",
            icon: "success",
            showConfirmButton: false,
            timer: 1300,
          });
        }
      })
      .catch((err) => {
        const errMsg = err.response.data;

        Swal.fire({
          icon: "error",
          title: errMsg.message,
          showConfirmButton: false,
          timer: 1300,
        });
      });
  }
};
</script>
