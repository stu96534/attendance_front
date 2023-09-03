<template>
  <div class="container mt-4 col-sm-6">
    <div class="card card-body mx-auto d-gird w-75">
      <div class="text-center">
        <!-- 相片 -->
        <img src="https://fakeimg.pl/120x130" class="rounded mt-4" alt="..." />
      </div>

      <!-- 名字 -->
      <div class="text-center mb-4">
        <h1 class="h3 mb-2 mt-4 font-weight-normal fs-1">{{ name }}</h1>
      </div>

      <!-- 日期 -->
      <div class="text-center mb-3">
        <h1 class="h3 mb-3 mt-1 font-weight-normal fs-5">{{ nowDay }}</h1>
      </div>

      <!-- 時間 -->
      <div class="text-center mb-4">
        <h1 class="h3 font-weight-normal fs-1">{{ nowTime }}</h1>
      </div>

      <!-- 打卡按鈕 -->
      <div class="row justify-content-center">
        <button id="clock" class="btn btn-success fs-1 disable" type="button" @click.stop.prevent="handleSubmit">Clock
        </button>
      </div>

      <p class="mt-4 mb-2 text-muted text-center">&copy; 2022-{{ nowYear }}</p>
    </div>
  </div>
</template>

<style>
#clock {
  width: 50%;
}

@media (max-width: 830px) {
  .card-body {
    width: 100% !important;
  }
}
</style>

<script  setup lang="ts" >
import { ref, computed } from "vue";
import attendantAPI from "../apis/attendant";
import { Toast, Loading, clockView } from "./../utils/helpers";
import Swal from "sweetalert2";
import { useAuthUserStore } from "../stores/auth-user";

const authUserStore = useAuthUserStore();
const nowYear = new Date().getFullYear();
const currentUser = computed(() => authUserStore.currentUser);
const name = ref(currentUser.value.name);
const image = ref(currentUser.value.image);
const userId = ref(currentUser.value.id);

const nowTime = ref("");
const nowDay = ref("");


//如果沒有image，用預設圖片
if (!image.value) {
  image.value = "https://fakeimg.pl/120x130";
}

// 顯示日期、時間
function timeFormate(timeStamp: any) {
  let newdate = new Date(timeStamp);
  let week = ["日", "一", "二", "三", "四", "五", "六"];

  let year = newdate.getFullYear();
  let month =
    newdate.getMonth() + 1 < 10
      ? "0" + (newdate.getMonth() + 1)
      : newdate.getMonth() + 1;
  let date =
    newdate.getDate() < 10 ? "0" + newdate.getDate() : newdate.getDate();
  let hh =
    newdate.getHours() < 10 ? "0" + newdate.getHours() : newdate.getHours();
  let mm =
    newdate.getMinutes() < 10
      ? "0" + newdate.getMinutes()
      : newdate.getMinutes();
  let ss =
    newdate.getSeconds() < 10
      ? "0" + newdate.getSeconds()
      : newdate.getSeconds();
  let day = week[newdate.getDay()];

  nowTime.value = hh + ":" + mm + ":" + ss;
  nowDay.value = year + "年" + month + "月" + date + "日 " + "(" + day + ")";
}

function nowTimes() {
  timeFormate(new Date());
  //定時1秒後，重新調用函式
  setInterval(function () {
    timeFormate(new Date());
  }, 1000);
}

nowTimes();

// 打卡功能
const handleSubmit = async () => {
  try {
    const date = new Date().valueOf();
    const isworking = await attendantAPI.getTodayAtt({ userId: userId.value, date })
    let response

    if (isworking.data.attendant) {

      response = await attendantAPI.clockOut({ userId: userId.value, date });
    } else {

      response = await attendantAPI.clockIn({ userId: userId.value, date });
    }


    if (response.data.status === "error") {
      throw new Error(response.data.message);
    }

    if (response.data.message === '上班打卡成功') {
      await Loading.fire({
        timer: 1000
      })

      clockView.fire({
        title: response.data.message,
        text: "祝你有美好的一天",
        icon: "success",
      })

    }

    if (response.data.message === '下班打卡成功') {
      await Loading.fire({
        timer: 1000
      })

      clockView.fire({
        title: response.data.message,
        text: "辛苦了 路上小心~~~",
        icon: "success",
      })
    }

  } catch (error) {

    await Loading.fire({
      timer: 1000
    })

    clockView.fire({
      title: "Error",
      text: "打卡失敗",
      icon: "error",
    })
  }
};
</script>
