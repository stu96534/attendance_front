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
      <li id="absenseRC" class="list-group-item border-dark absense">缺勤紀錄</li>
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
      <button
        id="holiday"
        class="list-group-item text-danger disabled"
        v-if="attendant['isHoliday'] && attendant['isAttendant']"
      > 加班
    </button>
      <li id="holiday" class="list-group-item text-danger"
        v-else-if="attendant['isHoliday']"></li>
      <button
        :id="attendant['id']"
        class="list-group-item btn-link text-warning absense"
        v-else-if="attendant['isAbsense']"
        @click="changeAtt"
      >
        缺勤
      </button>
      <button id="attendant" class="list-group-item text-success disabled" v-else-if="attendant['isAttendant']">
        到勤
      </button>
      <button id="noWork" class="list-group-item text-secondary disabled" v-else>
        尚未上班
      </button>

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

    <!-- 頁碼 -->
    <div class="d-flex justify-content-center mt-3">
      <Pagination v-if="Pages!.length > 1" :current-page="currentPage" :total-page="Pages" :previous-page="prev"
        :next-page="next" :Month="Month" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onBeforeRouteUpdate, useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import adminAPI from "../apis/admin";
import Pagination from "../components/AttPagination.vue";
import { changeDate, Toast } from "../utils/helpers";

const router = useRouter();
const route = useRoute();

const allMonth = Array.from({ length: 12 }).map((v, i) => i + 1);

const monthRouter = (event: any) => {
  router.push({
    name: "attendant",
    query: { month: event.target.value, page: 1 },
  });
};


const attendants = ref([]);
const Month = ref();
const Pages = ref([]);
const currentPage = ref();
const prev = ref();
const next = ref();

async function fetchAttendant({ month, page }: { month: any, page: any }) {
  try {
    const response = await adminAPI.getUserAttendant({
      month,
      userId: Number(route.params.id),
      page
    });

    //頁碼
    const pagination = response.data.pagination

    Pages.value = pagination.pages;
    currentPage.value = pagination.currentPage;
    prev.value = pagination.prev;
    next.value = pagination.next;

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

const { month, page } = route.query;
fetchAttendant({ month: month, page: page });

onBeforeRouteUpdate((to, from) => {
  const { month, page } = to.query;
  fetchAttendant({ month: month, page: page });
});



const changeAtt = async (event: any) => {
  const id = event.target.id

  Swal.fire({
    title: "要改成'到勤'嗎?",
    showDenyButton: true,
    confirmButtonText: '確定',
    denyButtonText: `取消`,
  }).then( async (result) => {
    if (result.isConfirmed) {
      await adminAPI.changeAttendant({ id })
      router.go(0)
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
}
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

#holiday {
  width: 200px;
}

.absense {
  width: 200px;
}

#attendant{
    width: 200px;
  }

#noWork {
      width: 200px;
    }
#descriptions {
  width: 200px;
}

#month {
  width: 50px;
}
</style>
