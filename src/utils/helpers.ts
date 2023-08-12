import axios from "axios";
import Swal from "sweetalert2";

const baseURL = "http://localhost:3000/api";
// "https://stormy-sierra-07744.herokuapp.com/api"
//"http://localhost:3000/api"


const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')

    if(token) {
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

//計算兩點經緯度的距離
export const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d * 1000;
}

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