<template>

  <div class="container">
    <div class="mt-5 position-absolute top-50 start-50 translate-middle camera">
      <qrcode-stream :key="_uid" @decode="onDecode" @init="onInit"></qrcode-stream>
    </div>
  </div>
  

</template>

<script setup>
import { QrcodeStream } from "vue3-qrcode-reader";
import attendantAPI from "../apis/attendant";
import { useStore } from "vuex";
import Swal from "sweetalert2";

const store = useStore();

const onDecode = async (decodedString) => {
  try {
    const data = JSON.parse(decodedString)
    const date = new Date().valueOf();
    
    localStorage.setItem("token", data.token)

    const response = await attendantAPI.addDate({ userId: data.userId, date });

    Swal.fire({
      title: "Success",
      text: response.data.message,
      icon: "success",
      timer: 1300,
    });

    store.commit("revokeAuthentication");

  } catch (error) {

    Swal.fire({
      title: "Error",
      text: "打卡失敗",
      icon: "error",
      timer: 1300,
    });
  }

};

const onInit = async (promise) => {
  // show loading indicator

  try {
    const { capabilities } = await promise;

    // successfully initialized
  } catch (error) {
    if (error.name === "NotAllowedError") {
      // user denied camera access permisson
    } else if (error.name === "NotFoundError") {
      // no suitable camera device installed
    } else if (error.name === "NotSupportedError") {
      // page is not served over HTTPS (or localhost)
    } else if (error.name === "NotReadableError") {
      // maybe camera is already in use
    } else if (error.name === "OverconstrainedError") {
      // did you requested the front camera although there is none?
    } else if (error.name === "StreamApiNotSupportedError") {
      // browser seems to be lacking features
    }
  } finally {
    // hide loading indicator
  }

};
</script>

<style>
.camera {
  width: 600px;
  height: 600px;
}
</style>