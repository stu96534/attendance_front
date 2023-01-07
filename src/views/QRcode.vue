<template>
  
  <div class="mt-5 d-flex justify-content-center">
    <qrcode-vue :value="value" :size="size"  id="qrcode"></qrcode-vue>
  </div>

</template>

<script setup>
import { ref, computed } from "vue";
import QrcodeVue from "qrcode.vue"
import { useStore } from "vuex";

const store = useStore();
const token = localStorage.getItem('token')
const currentUser = computed(() => store.getters.currentUser);
const userId = ref(currentUser.value.id);

let size = ref(500)
let data = { userId: userId.value, token }
let value = JSON.stringify(data)

</script>
