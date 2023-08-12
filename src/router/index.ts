import { computed } from "vue";
import { createRouter, createWebHistory, useRouter } from "vue-router";
import NotFound from "../views/NotFound.vue";
import store from "../store/index"

const route = useRouter()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/signin'
    },
    {
      path: '/signin',
      name: 'sign-in',
      component: () => import('../views/SignIn.vue'), 
    },
    {
      path: '/mainpage',
      name: 'mainPage',
      component: () => import('../views/MainPage.vue'),
    },
    {
      path: '/users',
      name: 'user',
      component: () => import('../views/User.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminPage.vue'),
    },
    {
      path: '/admin/user/:id',
      name: 'attendant',
      component: () => import('../views/AttendanceRecord.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },

  ],
});

router.beforeEach(async (to, from, next) => {
  //從localStorage 取出 token
  const token = localStorage.getItem('token')

  const currentUser = computed(() => store.getters.currentUser);

  //預設尚未驗證
  let isAuthenticated = false
  let isAdmin = false

  //有token才驗證
  if (token) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
    isAdmin = currentUser.value.isAdmin
  }

  const pathsWithoutAuthentication = ['sign-in', 'Qrcode-reader']
 
  //token無效且進入需要驗證的頁面，則轉址到登入首頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name as string)) {
      next('/signin')
      return
  }

  //token有效且進入不需要驗證的頁面，則轉址到打卡首頁
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name as string)) {
    next('/mainpage')
    return
  }

  if (!isAdmin && to.name === 'admin') {
    next('/mainpage')
    return
  }

  next()
})

export default router;
