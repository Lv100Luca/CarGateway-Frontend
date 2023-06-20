import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import AdminView from "@/views/AdminView.vue";
import AccountView from "@/views/AccountView.vue";
import LogoutView from "@/views/LogoutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
  ]
})

export default router
