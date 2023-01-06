<template>
  <div class="container py-5">
    <div class="card card-body mx-auto d-flex">
      <div class="text-center">
        <img :src="image" class="rounded mt-5" alt="..." />
      </div>

      <div class="text-center mb-4">
        <h1 class="h3 mb-2 mt-4 font-weight-normal fs-1">{{ name }}</h1>
      </div>

      <div class="text-center mb-4">
        <h1 class="h3 mb-3 mt-1 font-weight-normal fs-5">{{ nowDay }}</h1>
      </div>

      <div class="text-center mb-4">
        <h1 class="h3 mt-1 font-weight-normal fs-1">{{ nowTime }}</h1>
      </div>

      <div class="d-grid justify-content-center align-self-center">
        <button
          class="btn btn-success btn-block mb-3 fs-1 clock"
          type="button"
          @click.stop.prevent="handleSubmit"
          :disabled="!isDistance"
        >
          Clock
        </button>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2022-{{ nowYear }}</p>
    </div>
  </div>
</template>

<style>
.clock {
  width: 200px;
  height: 110px;
}
</style>

<script setup lang="ts">
import { ref, computed } from "vue";
import attendantAPI from "../apis/attendant";
import usersAPI from "../apis/users";
import Swal from "sweetalert2";
import { useStore } from "vuex";

const store = useStore();
const nowYear = new Date().getFullYear();
const currentUser = computed(() => store.getters.currentUser);
const name = ref(currentUser.value.name);
const image = ref(currentUser.value.image);
const userId = ref(currentUser.value.id);
const isDistance = ref(currentUser.value.isDistance);

const nowTime = ref("");
const nowDay = ref("");

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

// GPS驗證
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // 地球的平均半径，单位为千米
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d * 1000;
}

let lat2 = 22.6514891;
let lon2 = 120.33052;

navigator.geolocation.watchPosition(
  async function (position) {
    // position是一个对象，包含有关用户位置的信息
    let lat1 = position.coords.latitude;
    let lon1 = position.coords.longitude;

    console.log(getDistance(lat1, lon1, lat2, lon2));
    let distance = getDistance(lat1, lon1, lat2, lon2);

    if (distance < 400) {
      await usersAPI.putGPSDistance({ isDistance: true });
    } else {
      await usersAPI.putGPSDistance({ isDistance: false });
    }
  },
  function (error) {
    console.log(error);
  }
);

// 打卡功能
const handleSubmit = async () => {
  try {
    const date = new Date().valueOf();
    const { data } = await attendantAPI.addDate({ userId: userId.value, date });

    if (data.status === "error") {
      throw new Error(data.message);
    }

    Swal.fire({
      title: "Success",
      text: data.message,
      icon: "success",
      timer: 1300,
    });
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "打卡失敗",
      icon: "error",
    });
  }
};
</script>
