import axios from "axios";
import Swal from "sweetalert2";

const baseURL = "http://localhost:3000/api";
// "https://stormy-sierra-07744.herokuapp.com/api"

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

export const apiHelper = axiosInstance

export const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  showConfirmButton: false,
  timer: 3000,
});

