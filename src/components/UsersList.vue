<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <div class="row align-items-center">

      <h3>{{ user!.name }}</h3>

      <h6 class="text-secondary">{{ user!.email }}</h6>

    </div>

    <div class="row">
      <div v-if="!user!.locked" class="col row me-2">
        <button type="button" class="btn btn-secondary me-4 disabled">未上鎖</button>
      </div>

      <div v-else class="col row me-4">
        <button type="button" class="btn btn-success me-4 " @click.stop.prevent="unlockUser({ userId: user!.userId })">解鎖</button>
      </div>


      <RouterLink
            :to="{ name: 'attendant', params: { id: user!.userId }, query: { month: 1, page: 1 } }" type="button" class="btn btn-primary col me-3">出勤紀錄</RouterLink>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from "vue"
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";

const props = defineProps({
  users: Array,
  initialUser: Object
})

const user = computed(() => props.initialUser)

async function unlockUser ({ userId }: { userId: number }) {
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