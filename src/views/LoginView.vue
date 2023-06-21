<script setup lang="ts">
import APIService from "@/API/APIService";
import {useUserDataStore} from "@/stores/userDataStore";
import {ref} from "vue";
import {getHighestRole, Role} from "@/components/models/Role";
import {useRouter} from "vue-router";
import {useRoute} from "vue-router";

const userDataStore = useUserDataStore();

const username = ref("");
const password = ref("");

const router = useRouter();
const route = useRoute();

async function login() {
  APIService.ApiLogin(username.value, password.value).then(response => { //todo put somewhere
    userDataStore.username = response!.username;
    userDataStore.id = response!.id;
    userDataStore.role = getHighestRole(response!.roles);
    userDataStore.isAuthenticated = true;
    userDataStore.token = response!.token;

    const returnRoute = route.query.return;

    if (typeof returnRoute === "string") {
      console.log("Pushing to " + returnRoute.replace("/",""));
       router.push(returnRoute.replace("/","")); // fixme
      return;
    }
     router.push("/")
  }); // ask timings???

}
</script>

<template>
  <div class="page">
    <div class="login">
      <h1 class="title">Login</h1>
      <label class="text-label">
        Username:
        <input v-model="username" type="text" class="username">
      </label>
      <label class="text-label">
        Password:
        <input v-model="password" type="password" class="password">
      </label>
      <input @click="login()" type="button" value="Login" class="login-button">
    </div>
  </div>
</template>
<style scoped>
.page {
  display: flex;
  justify-content: center;
  height: calc(100dvh - var(--navbar-height));
  width: 100vw;
}

.login {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 30rem;
}

.title {
  font-size: 8rem;
}

.text-label {
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  width: 80%;
}

.username, .password {
  font-size: 2rem;
}

.login-button {
  margin-top: 1rem;
  font-size: 2rem;
  width: 80%;
}


</style>