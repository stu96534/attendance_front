// import { NOTFOUND } from "dns";
import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../views/NotFound.vue";
import SignIn from "../views/SignIn.vue"
import store from "../store/index"



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
      component: SignIn,
    },
    {
      path: '/attendant',
      name: 'attendant',
      component: () => import('../views/Attendant.vue'),
    },
    {
      path: '/users',
      name: 'user',
      component: () => import('../views/User.vue'),
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

  //預設尚未驗證
  let isAuthenticated = false

  //有token才驗證
  if (token) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

   //token無效且進入需要驗證的頁面，則轉址到登入首頁
  if(!isAuthenticated && to.name !== 'sign-in') {
    next('/signin')
    return
  }

  //token有效且進入不需要驗證的頁面，則轉址到打卡首頁
  if (isAuthenticated && to.name === 'sign-in') {
    next('/attendant')
    return
  }
  
  next()
})

export default router;
