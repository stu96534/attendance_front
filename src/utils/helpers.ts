import axios from "axios";
import Swal from "sweetalert2";
import { ref, computed } from "vue";

const baseURL = "http://localhost:3000/api";
// "https://stormy-sierra-07744.herokuapp.com/api"
//"http://localhost:3000/api"



const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  err => Promise.reject(err)
)

//需要身分驗證的apiHelper
export const apiHelper = axiosInstance

//不需身分驗證的apiHelper
export const axiosNoauth = axios.create({
  baseURL,
});

//提示視窗
export const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  showConfirmButton: false,
  timer: 3000,
});

//loeding 視窗
export const Loading = Swal.mixin({
  title: 'Waiting...',
  showConfirmButton: false,
  didOpen: () => {
    Swal.showLoading(Swal.getDenyButton())
  }
})

//打卡結果 視窗
export const clockView = Swal.mixin({
  showConfirmButton: false,
  timer: 1300,
})

//改變日期格式
export const changeDate = (date: number) => {
  const newdate = new Date(date)
  let nowDay = ''

  const month =
    newdate.getMonth() + 1 < 10
      ? "0" + (newdate.getMonth() + 1)
      : newdate.getMonth() + 1;
  const day =
    newdate.getDate() < 10 ? "0" + newdate.getDate() : newdate.getDate();
  const hh =
    newdate.getHours() < 10 ? "0" + newdate.getHours() : newdate.getHours();
  const mm =
    newdate.getMinutes() < 10
      ? "0" + newdate.getMinutes()
      : newdate.getMinutes();
  const ss =
    newdate.getSeconds() < 10
      ? "0" + newdate.getSeconds()
      : newdate.getSeconds();
  nowDay = month + '/' + day + ' ' + hh + ':' + mm + ':' + ss

  return nowDay
}

