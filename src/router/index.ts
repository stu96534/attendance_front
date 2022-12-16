// import { NOTFOUND } from "dns";
import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../views/NotFound.vue";
import SignIn from "../views/SignIn.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/users/:id',
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

export default router;
