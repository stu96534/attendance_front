<template>
  <div class="container mt-5">

    <!-- 年分 月份 -->
    <div class="mb-3 me-5 d-flex flex-row-reverse bd-highlight" @change="dateRouter($event)">
      <select class="btn btn-secondary" role="button" id="dropdownMenuLink" >
        <option value="">
          全部
        </option>
        <option v-for="month in allMonth" :key="month" :value="month">
          {{ month }} 月
        </option>
      </select>

      <select class="btn btn-secondary me-3" role="button" id="dropdownMenuLink">
        <option value="">
            年份
          </option>
            <option v-for="year in allYear" :key="year" :value="year">
              {{ year }} 
            </option>
          </select>
    </div>

    <table class="table text-center table-striped">
      <thead>
        <tr>
          <th scope="col">日期</th>
          <th scope="col">上班時間</th>
          <th scope="col">下班時間</th>
          <th scope="col" class="state">出勤狀況</th>
          <th scope="col">備註</th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="attendant in attendants" :key="attendant['id']">
          <!-- 日期 -->
          <th scope="row" class="text-danger" v-if="attendant['isHoliday']">{{ attendant["date"] }} ({{ attendant["week"]
          }})</th>
          <th scope="row" v-else>{{ attendant["date"] }} ({{ attendant["week"] }})</th>

          <!-- 上班時間 -->
          <td class="text-danger" v-if="attendant['isHoliday']">{{ attendant["checkIn"] }}</td>

          <td v-else>{{ attendant["checkIn"] }}</td>

          <!-- 下班時間 -->
          <td class="text-danger" v-if="attendant['isHoliday']">{{ attendant["checkOut"] }}</td>

          <td v-else>{{ attendant["checkOut"] }}</td>

          <!-- 出勤紀錄 -->
          <td class="text-danger" v-if="attendant['isHoliday']">加班</td>

          <td class="text-warning" v-else-if="attendant['isAbsense']">缺勤</td>

          <td class="text-success" v-else>到勤</td>

          <!-- 備註 -->
          <td><button :id="attendant['id']" class="btn btn-sm btn-primary" v-if="attendant['isAbsense'] && !attendant['isHoliday']"
              @click="changeAtt">改為到勤</button></td>
        </tr>

      </tbody>
    </table>

    <!-- 頁碼 -->
    <div class="d-flex justify-content-center mt-3">
      <Pagination v-if="Pages!.length > 1" :current-page="currentPage" :total-page="Pages" :previous-page="prev"
        :next-page="next" :routeName="'attendant'" :queryElement="{ month: Month, year: Year }" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onBeforeRouteUpdate, useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import adminAPI from "../apis/admin";
import Pagination from "../components/Pagination.vue";
import { changeDate, Toast } from "../utils/helpers";

const router = useRouter();
const route = useRoute();

const allYear = [2024, 2023]
const allMonth = Array.from({ length: 12 }).map((v, i) => i + 1);

const monthTemp = ref('');
const yearTemp = ref('');

const dateRouter = (event: any) => {

  if (event.target.value > 12) {
    yearTemp.value = event.target.value
  } else {
    monthTemp.value = event.target.value
  }

  router.push({
    name: "attendant",
    query: { year: yearTemp.value, month: monthTemp.value, page: 1 },
  });
};


const attendants = ref([]);
const Month = ref();
const Year = ref();
const Pages = ref([]);
const currentPage = ref();
const prev = ref();
const next = ref();

async function fetchAttendant({ month, page, year }: { month: any, page: any, year: any }) {
  try {
    const response = await adminAPI.getUserAttendant({
      month,
      userId: Number(route.params.id),
      page,
      year
    });

    //頁碼
    const pagination = response.data.pagination

    Pages.value = pagination.pages;
    currentPage.value = pagination.currentPage;
    prev.value = pagination.prev;
    next.value = pagination.next;

    //年份
    Year.value = response.data.year

    //月份
    Month.value = response.data.month

    //出勤資料
    attendants.value = response.data.attendants;

    attendants.value.map((attendant: any) => {
      const checkin = attendant["checkIn"];
      const checkout = attendant["checkOut"];
      if (checkin) {
        attendant["checkIn"] = changeDate(checkin);
      }

      if (checkout) {
        attendant["checkOut"] = changeDate(checkout);
      }

    });

  } catch (error) {
    console.log("error", error);
    Toast.fire({
      icon: 'error',
      title: '無法取得使用者資料，請稍後再試'
    })
  }
}

const { month, page, year } = route.query;
fetchAttendant({ month: month, page: page, year: year  });

onBeforeRouteUpdate((to, from) => {
  const { month, page, year } = to.query;
  fetchAttendant({ month: month, page: page, year: year });
});


const changeAtt = async (event: any) => {
  const id = event.target.id

  Swal.fire({
    title: "要改成'到勤'嗎?",
    showDenyButton: true,
    confirmButtonText: '確定',
    denyButtonText: `取消`,
  }).then(async (result) => {

    if (result.isConfirmed) {
      await adminAPI.changeAttendant({ id })
      router.go(0)
    }
  })
}
</script>

<style>
#month {
  width: 50px;
}

@media (max-width: 768px) {
  .state {
    width: 100px
  }
}

@media (max-width: 488px) {
  table {
    font-size: 13px;
  }
}
</style>
