<script lang="ts" setup>

import {computed, ref} from "vue";
import APIClient from "@/API/APIClient";
import type UserRegisterDTO from "@/DTO/UserRegisterDTO";
import {useUserDataStore} from "@/stores/userDataStore";
import {useRouter} from "vue-router";

const userDataStore = useUserDataStore();
const vorname = ref("luca");
const nachname = ref("diegel");
const username = ref("luca");
const password = ref("admin");

const router = useRouter();

const isComplete = computed(() => {
  return (vorname.value !== "" && nachname.value !== "" && username.value !== "" && password.value !== "");

})

async function register() {
  console.debug("submitting");
  try {
    await APIClient.postRequest<UserRegisterDTO, any>("/user/register", true, {
      "vorname": vorname.value,
      "nachname": nachname.value,
      "username": username.value,
      "password": password.value
    });
  } catch (e) {
    console.debug("error in Register");
    vorname.value = "";
    nachname.value = "";
    username.value = "";
    password.value = "";
    console.debug(e);
  }
  console.debug("Register OK");
  if (await userDataStore.login(username.value, password.value)) {
    console.debug("Login after RegisterOK");
    await router.push("/account")
  }
}
</script>

<template>
  <div class="wrapper">
    <form class="register-from">
      <h1>Register</h1>
      <div class="standort">
        <label style="display: flex; flex-direction: column">Vorname:
          <input v-model="vorname" placeholder="vorname" required type="text">
        </label>
        <label style="display: flex; flex-direction: column">Nachname:
          <input v-model="nachname" placeholder="nachname" required type="text">
        </label>
      </div>
      <label class="username" style="display: flex; flex-direction: column">
        Username:
        <input v-model="username" placeholder="username" required type="text">
      </label>
      <label class="password" style="display: flex; flex-direction: column">
        Password:
        <input v-model="password" placeholder="password" required type="password">
      </label>
      <input :disabled="!isComplete" type="button" value="Register" @click="register">
    </form>
  </div>
</template>

<style scoped>
.wrapper {
  height: calc(100dvh - var(--navbar-height));
  width: 100vw;
  display: flex;
  justify-content: center;
}

.register-from {
  display: flex;
  flex-direction: column;
  width: 40%;
}

.standort {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
}

.standort > label {
  width: 50%;
}
</style>