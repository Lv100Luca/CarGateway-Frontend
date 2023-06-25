<script setup lang="ts">
import {useUserDataStore} from "@/stores/userDataStore";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const userDataStore = useUserDataStore();

const username = ref("");
const password = ref("admin");

const router = useRouter();
const route = useRoute();


async function handleLogin() {
  let loginSuccess: boolean;
  loginSuccess = await userDataStore.login(username.value, password.value);
  console.log(loginSuccess)
  if (loginSuccess) {
    const returnRoute = route.query.return;

    if (typeof returnRoute === "string") {
      console.log("Pushing to " + returnRoute.replace("/", ""));
      await router.push(returnRoute.replace("/", "")); // fixme
      return;
    }

    await router.push("/")
    return;
  } else {
    console.log("User/Password wrong")
  }

}
</script>

<template>
  <div class="page">

    <div class="login">
      <h1 class="title">Login</h1>
      <div>
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
        <input v-model="username" type="text" class="username">
      </label>
      <label class="text-label">
        Password:
        <input @keydown.enter="handleLogin()" v-model="password" type="password" class="password">
      </label>
      <input @click="handleLogin()" type="button" value="Login" class="login-button">
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