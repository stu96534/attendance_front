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
        <button class="btn btn-success btn-block mb-3 fs-1 clock" type="button" @click.stop.prevent="handleSubmit">
          Clock
        </button>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
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
import Swal from "sweetalert2";
import { useStore } from "vuex";


const store = useStore();
const currentUser = computed(() => store.getters.currentUser);
const name = ref(currentUser.value.name);
const image = ref(currentUser.value.image);
const userId = ref(currentUser.value.id);

const nowTime = ref("");
const nowDay = ref("");

if (!image.value) {
  image.value = "https://fakeimg.pl/120x130";
}

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

const handleSubmit = async () => {
  try {
    const date = new Date().valueOf();
    const { data } = await attendantAPI.addDate({ userId: userId.value, date });

    if (data.status === 'error') {
      throw new Error(data.message)
    }

    Swal.fire({
      title: "Success",
      text: data.message,
      icon: "success",
      timer: 1300
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
