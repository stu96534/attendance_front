<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <div class="row align-items-center col-6">

      <h3>{{ user!.name }}</h3>

      <h6 class="text-secondary">{{ user!.email }}</h6>

    </div>

    <div class="row col-6 col-xl-3 col-lg-4">
      <div v-if="user!.isAdmin" class="col row me-2">
        <button type="button" class="btn btn-danger btn-admin disabled">管理者</button>
      </div>

      <div v-else-if="!user!.locked" class="col row me-2">
        <button type="button" class="btn btn-secondary btn-unlock disabled">未上鎖</button>
      </div>

      <div v-else class="col row me-4">
        <button type="button" class="btn btn-success btn-lock "
          @click.stop.prevent="unlockUser({ userId: user!.userId })">解鎖</button>
      </div>

      <RouterLink :to="{ name: 'attendant', params: { id: user!.userId }, query: { year: '',month: '', page: 1 } }" type="button"
        class="btn btn-primary btn-att col me-3">出勤紀錄</RouterLink>
    </div>
  </li>
</template>

<style>
@media (max-width: 480px) {

  .btn-admin {
    font-size: 14px;
  }

  .btn-lock {
    font-size: 14px;
  }

  .btn-unlock {
    font-size: 14px;
  }

  .btn-att {
    font-size: 14px;
  }
}

@media (max-width: 450px) {
  .btn-admin {
    width: 65px;
    height: 35px;
    font-size: 13px;
  }

  .btn-lock {
    width: 65px;
    height: 35px;
    font-size: 13px;
  }

  .btn-unlock {
    width: 65px;
    height: 35px;
    font-size: 13px;
  }

  .btn-att {
    width: 80px;
    height: 50px;
    font-size: 12px;
  }

}
</style>

<script setup lang="ts">
import { computed } from "vue"
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";

const props = defineProps({
  users: Array,
  initialUser: Object
})

const user = computed(() => props.initialUser)

async function unlockUser({ userId }: { userId: number }) {
  const { data } = await adminAPI.unlockUser({ userId })

  if (data.status === 'error') {
    Toast.fire({
      icon: 'error',
      title: '無法解鎖，請稍後再試'
    })
    return
  }

  user.value!.locked = false
}
</script>