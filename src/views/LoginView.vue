<script setup lang="ts">
import {useUserDataStore} from "@/stores/userDataStore";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const userDataStore = useUserDataStore();

const username = ref("");
const password = ref("");

const router = useRouter();
const route = useRoute();
const isLoading = ref(false);
const errorMsg = ref("");

async function handleLogin() {
  let loginSuccess: boolean;
  isLoading.value = true;
  loginSuccess = await userDataStore.login(username.value, password.value);
  console.debug(loginSuccess)
  if (loginSuccess) {
    const returnRoute = route.query.return;

    if (typeof returnRoute === "string") {
      console.debug("Pushing to " + returnRoute.replace("/", ""));
      await router.push(returnRoute.replace("/", ""));
      return;
    }
    console.log("pushing login")
    await router.push("/")
    errorMsg.value = "";

    return;
  } else {
    console.debug("User/Password wrong")
    username.value = "";
    password.value = "";
    errorMsg.value = "User/Password wrong";
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="page">

    <div class="login">
      <h1 class="title">Login</h1>
      <div class="selector" v-if="!(username=='admin') && false">
        <select v-model="username">
          <option disabled value="">Please select one</option>
          <option>RedditAdminJoe</option>
          <option>AverageEmployeeJames</option>
          <option>LoyalUserJim</option>
          <option>NoneJustin</option>
        </select>
      </div>
      <label class="text-label">
        Username:
        <input v-model="username" class="username" type="text" @keydown.enter="handleLogin()">
      </label>
      <label class="text-label">
        Password:
        <input @keydown.enter="handleLogin()" v-model="password" type="password" class="password">
      </label>
      <router-link to="/register">Register</router-link>
      <label style="color: red" v-if="errorMsg != ''">{{errorMsg}}</label>
      <input :disabled="isLoading || (username == '') || (password == '')" class="login-button" type="button"
             value="Login" @click="handleLogin()">
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