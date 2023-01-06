<template>
  <div class="container py-4 mt-3">

    <!-- 月份 -->
    <div class="mb-5 me-5 d-flex flex-row-reverse bd-highlight">
      <select
        class="btn btn-secondary"
        role="button"
        id="dropdownMenuLink"
        @change="monthRouter($event)"
      >
        <option v-for="month in allMonth" :key="month" :value="month">
          {{ month }} 月
        </option>
      </select>
    </div>

    <!-- List -->
    <ul class="list-group list-group-horizontal">
      <li id="date" class="list-group-item border-dark">日期</li>
      <li id="checkIn" class="list-group-item border-dark">上班時間</li>
      <li id="checkOut" class="list-group-item border-dark">下班時間</li>
      <li id="absense" class="list-group-item border-dark">缺勤紀錄</li>
      <li id="descriptions" class="list-group-item border-dark">備註</li>
    </ul>

    <ul
      class="list-group list-group-horizontal"
      v-for="attendant in attendants"
      :key="attendant['id']"
    >
    <!-- 日期 -->
      <li
        id="date"
        class="list-group-item text-danger"
        v-if="attendant['isHoliday']"
      >
        {{ attendant["date"] }} ({{ attendant["week"] }})
      </li>
      <li id="date" class="list-group-item" v-else>{{ attendant["date"] }} ({{ attendant["week"] }})</li>

      <!-- 上班時間 -->
      <li
        id="checkIn"
        class="list-group-item text-danger"
        v-if="attendant['isHoliday']"
      >
        {{ attendant["checkIn"] }}
      </li>
      <li id="checkIn" class="list-group-item" v-else>
        {{ attendant["checkIn"] }}
      </li>

      <!-- 下班時間 -->
      <li
        id="checkOut"
        class="list-group-item text-danger"
        v-if="attendant['isHoliday']"
      >
        {{ attendant["checkOut"] }}
      </li>
      <li id="checkOut" class="list-group-item" v-else>
        {{ attendant["checkOut"] }}
      </li>

      <!-- 缺勤紀錄 -->
      <li
        id="absense"
        class="list-group-item text-danger"
        v-if="attendant['isHoliday']"
      ></li>
      <li
        id="absense"
        class="list-group-item text-warning"
        v-else-if="attendant['isAbsense']"
      >
        缺勤
      </li>
      <li id="absense" class="list-group-item text-success" v-else-if="attend">
        到勤
      </li>
      <li id="absense" class="list-group-item text-secondary" v-else>
        尚未上班
      </li>

      <!-- 備註 -->
      <li
        id="descriptions"
        class="list-group-item text-danger"
        v-if="attendant['isHoliday']"
      >
        {{ attendant["description"] }}
      </li>
      <li id="descriptions" class="list-group-item" v-else>
        {{ attendant["description"] }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onBeforeRouteUpdate, useRouter, useRoute } from "vue-router";
import adminAPI from "../apis/admin";

const router = useRouter();
const route = useRoute();
const attend = ref(false)

const allMonth = Array.from({ length: 12 }).map((v, i) => i + 1);

const monthRouter = (event: any) => {
  router.push({
    name: "attendant",
    query: { month: event.target.value },
  });
};

function changeDate(date: number) {
const newdate = new Date(date)
let nowDay = ''

  let month =
    newdate.getMonth() + 1 < 10
      ? "0" + (newdate.getMonth() + 1)
      : newdate.getMonth() + 1;
  let day =
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
  nowDay = month + '/' + day + ' ' + hh + ':' + mm + ':' + ss

  return nowDay
}

const attendants = ref([]);
// const Pages = ref([]);
// const currentPage = ref();
// const prev = ref();
// const next = ref();

async function fetchAttendant({ month }: { month: any }) {
  try {
    const response = await adminAPI.getUserAttendant({
      month,
      userId: Number(route.params.id),
    });
    // const pagination = response.data.pagination

    attendants.value = response.data;

    attendants.value.map((attendant: any) => {
      const checkin = attendant["checkIn"];
      const checkout = attendant["checkOut"];
      if (checkin) {
        attendant["checkIn"] = changeDate(checkin);
        attend.value = true && !attendant['isAbsense']
      }

      if (checkout) {
        attendant["checkOut"] = changeDate(checkout);
      }

      // console.log(x["checkIn"]);
    });
    // Pages.value = pagination.pages;
    // currentPage.value = pagination.currentPage;
    // prev.value = pagination.prev;
    // next.value = pagination.next;
  } catch (error) {
    console.log("error", error);
    // Toast.fire({
    //   icon: 'error',
    //   title: '無法取得使用者資料，請稍後再試'
    // })
  }
}

const { month } = route.query;
fetchAttendant({ month: month });

onBeforeRouteUpdate((to, from) => {
  const { month } = to.query;
  fetchAttendant({ month: month });
});
</script>

<style>
#date {
  width: 150px;
}

#checkIn {
  width: 350px;
}

#checkOut {
  width: 350px;
}

#absense {
  width: 200px;
}

#descriptions {
  width: 200px;
}

#month {
  width: 50px;
}
</style>
