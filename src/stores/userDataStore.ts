import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useUserDataStore = defineStore('UserDataStore', () => {

    const token = ref<String>("");
    const roles = ref([]);
    const authenticated = ref(false);
    return {token, roles, authenticated}
})
