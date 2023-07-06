import {computed, reactive} from 'vue'
import {defineStore} from 'pinia'
import APIClient from "@/API/APIClient";
import type LoginDTO from "@/DTO/LoginDTO";
import type LoginResponseDTO from "@/DTO/LoginResponseDTO";
import type UserResponseDTO from "@/DTO/UserResponseDTO";
import type UserDataStoreStare from "@/components/models/UserDataStoreStare";

export const useUserDataStore = defineStore('UserDataStore', () => {

    const state = reactive<UserDataStoreStare>({user: null});
    const user = computed<UserResponseDTO>(() => state.user!);
    const hasUser = computed<boolean>(() => state.user !== null)

    async function login(login: string, password: string): Promise<boolean> {
        const response = await APIClient.postRequest<LoginDTO, LoginResponseDTO>(
            "/user/login",
            false,
            {
                "username": login,
                "password": password
            });
        if (response == undefined) {
            console.log("error in Login"); //todo Error handling
            return false;
        } else {
            console.log("Login OK")
            if ("token" in response) { // fixme
                APIClient.token = response.token;
            }
            await fetchSelf();
            return true;
        }
    }

    function logout() {
        APIClient.token = null;
        state.user = null;

    }

    async function fetchSelf() {
        if (state.user !== null) return state.user; // of we have a user, return it
        if (APIClient.token === null) return null; // when there s not token, return null

        console.log("Fetching Self")
        const response = await APIClient.getRequest<UserResponseDTO>("/user/self", true);
        try {
            if (response == null) {
                console.log("Error Fetching self")
                return null;
            } else {

                state.user = response;

                return state.user;
            }
        } catch (e) {
            console.log("Error in fetchSelf -> Returning Null")
            return null;
        }

    }

    return {login, logout, fetchSelf, state, user, hasUser}
})


