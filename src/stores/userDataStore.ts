import {ref} from 'vue'
import {defineStore} from 'pinia'
import APIService from "@/API/APIService";
import {Role} from "@/components/models/Role";
// todo move login logic here
export const useUserDataStore = defineStore('UserDataStore', () => {
    const username = ref("Obama Prism");
    const id = ref(-1);
    const role = ref(Role.none);
    const isAuthenticated = ref(false);
    const token = ref<String>("");

    return {token, role, isAuthenticated, username, id}
})
