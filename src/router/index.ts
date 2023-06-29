import {createRouter, createWebHistory} from 'vue-router'
// @ts-ignore
import HomeView from "@/views/HomeView.vue";
// @ts-ignore
import LoginView from "@/views/LoginView.vue";
// @ts-ignore
import AdminView from "@/views/AdminView.vue";
// @ts-ignore
import AccountView from "@/views/AccountView.vue";
// @ts-ignore
import LogoutView from "@/views/LogoutView.vue";
import {getHighestRole, Role} from "@/components/models/Role";
import "vue-router";
import {useUserDataStore} from "@/stores/userDataStore";
import ManageUserView from "@/views/ManageUserView.vue";
// @ts-ignore
import Register from "@/views/Register.vue";
import WelcomeView from "@/views/WelcomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/welcome',
            name: 'welcome',
            component: WelcomeView,
            meta: {
                minimumRole: Role.none,
                onlyGuest: true
            }
        },
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
        }, {
            path: '/manage',
            name: 'manage',
            component: ManageUserView,
            meta: {
                minimumRole: Role.employee,
                onlyGuest: false
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                minimumRole: Role.none,
                onlyGuest: true
            }
        }

    ]
});

router.beforeEach(async (to, from) => {
    const userData = useUserDataStore();
    // const user = userData.user;
    const user = await userData.fetchSelf();
    const isAuth = userData.hasUser;

    const role = getHighestRole(user?.roles ?? []);

    if (to.meta.minimumRole > role && !isAuth) {
        console.log("Blocked Route to: " + to.path)

        return {name: "login", query: {return: to.path}} // routes user to Login
    }

    if (to.meta.onlyGuest && isAuth) {
        return from;
    }

});

export default router


export {};

declare module "vue-router" {
    interface RouteMeta {
        onlyGuest: boolean;
        minimumRole: Role;
    }
}
