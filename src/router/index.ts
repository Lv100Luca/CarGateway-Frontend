import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import AdminView from "@/views/AdminView.vue";
import AccountView from "@/views/AccountView.vue";
import LogoutView from "@/views/LogoutView.vue";
import {Role} from "@/components/models/Role";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //     path: '/welcome',
    //     name: 'welcome',
    //     component: HomeView,
    //     meta: {
    //         minimumRole: Role.none,
    //         onlyGuest: true
    //     }
    //
    // }, todo implkement later maybe???
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        minimumRole: Role.none,
        onlyGuest: false,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        minimumRole: Role.none,
        onlyGuest: true
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView,
      meta: {
        minimumRole: Role.user,
        onlyGuest: false
      }
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      meta: {
        minimumRole: Role.user,
        onlyGuest: false
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: {
        minimumRole: Role.admin,
        onlyGuest: false
      }
    },
  ]
});

router.beforeEach(async (to, from) => {
  const userData = useUserDataStore();
  const role = userData.role;
  const isAuth = userData.hasUser;

  if (to.meta.minimumRole > role && !isAuth) {
    console.log("Blocked Route to: " + to.path)

    return {name: "login", query: {return: to.path}} // routes user to Login
  }

});

export default router


export {};

import "vue-router";
import {useUserDataStore} from "@/stores/userDataStore";

declare module "vue-router" {
  interface RouteMeta {
    onlyGuest: boolean;
    minimumRole: Role;
  }
}
