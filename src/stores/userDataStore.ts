import {ref} from 'vue'
import {defineStore} from 'pinia'
import {getHighestRole, Role} from "@/components/models/Role";
import APIClient from "@/API/APIClient";
import type LoginDTO from "@/DTO/LoginDTO";
import type LoginResponseDTO from "@/DTO/LoginResponseDTO";
import type UserResponseDTO from "@/DTO/UserResponseDTO";
// todo move login logic here
export const useUserDataStore = defineStore('UserDataStore', () => {
    const id = ref(-1);
    const username = ref("");
    const vorname = ref("");
    const nachname = ref("");
    const role = ref(Role.none);
    const hasUser = ref(false); // repalce with state interface

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
            APIClient.token = response.token;
            await fetchSelf();
            return true;
        }
    }

    function logout() { // todo async yes?
        APIClient.token = "";
        id.value = -1;
        username.value = "";
        vorname.value = "";
        nachname.value = "";
        role.value = Role.none;
        hasUser.value = false;
    }

    async function fetchSelf() {
        const response = await APIClient.getRequest<UserResponseDTO>("/user/self", true);
            if (response == undefined) {
                console.log("Error Fetching self")
                return false;
            } else {
                console.log(response.rollen)
                id.value = response.id;
                username.value = response.username;
                vorname.value = response.vorname;
                nachname.value = response.nachname
                // role.value = 3;
                role.value = getHighestRole(response.rollen);
                hasUser.value = true;
                return true;
        }
    }

    return {id, username, vorname, nachname, role, hasUser, login, logout, fetchSelf}
})


