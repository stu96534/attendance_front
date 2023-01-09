<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light ">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">鈦坦出勤</RouterLink>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto mb-2 mb-md-0">
          <RouterLink to="/qrcode_reader" class="nav-link fs-5 qr_camera disable" v-if="!isAuthenticated">
            QRcode Camera
          </RouterLink>

          <RouterLink :to="{ name: 'admin', query: { page: 1 } }" class="nav-link fs-5 me-4" aria-current="page"
            v-if="currentUser.isAdmin">Admin
          </RouterLink>

          <template v-if="isAuthenticated">
            <RouterLink to="/qrcode" class="nav-link fs-5 me-4">
              QRcode
            </RouterLink>

            <RouterLink to="/users" class="nav-link fs-5 me-4" aria-current="page">Setting</RouterLink>
            
            <button type="button" class="btn btn-sm btn-outline-success my-2 my-sm-0 fs-5 me-4" @click="logout">
              登出
            </button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import locationAPI from "../apis/location";
import { getDistance } from "./../utils/helpers";

const router = useRouter();
const store = useStore();

const currentUser = computed(() => store.getters.currentUser);

const isAuthenticated = computed(() => store.getters.isAuthenticated);

//登出
const logout = () => {
  store.commit("revokeAuthentication");

  router.push("/sigin");
  router.go(0)
};

// GPS驗證

//工作地點經緯度
let lat2
let lon2

//判斷目前位置離工作地點是否在400公尺內
navigator.geolocation.watchPosition(
  async function (position) {
    const { data } = await locationAPI.getLocation()
    const { latitube, longitube } = data

    if (latitube === 0) {
      lat2 = position.coords.latitude;
      lon2 = position.coords.longitude;
    } else {
      lat2 = latitube;
      lon2 = longitube;
    }

    let lat1 = position.coords.latitude;
    let lon1 = position.coords.longitude;
    let camera = document.querySelector('.qr_camera')
    let distance = getDistance(lat1, lon1, lat2, lon2);

    //若距離在400公尺外，QRCode Camera無效
    if (distance < 400) {
      camera?.classList.remove('disabled')
    } else {
      camera?.classList.add('disabled')
    }
  },
  function (error) {
    console.log(error);
    let camera = document.querySelector('.qr_camera')
    camera?.classList.add('disabled')
  }
);
</script>
