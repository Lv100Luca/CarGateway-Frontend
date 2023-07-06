<script setup lang="ts">

import {computed, ref} from "vue";
// @ts-ignore
import APIClient from "@/API/APIClient";
// @ts-ignore
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
  console.log("submitting");
  try {
    await APIClient.postRequest<UserRegisterDTO, any>("/user/register", true, {
      "vorname": vorname.value,
      "nachname": nachname.value,
      "username": username.value,
      "password": password.value
    });
  } catch (e) {
    console.log("error in Register");
    vorname.value = "";
    nachname.value = "";
    username.value = "";
    password.value = "";
    console.log(e);
  }
  console.log("Register OK");
  if (await userDataStore.login(username.value, password.value)) {
    console.log("Login after RegisterOK");
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
          <input required type="text" v-model="vorname" placeholder="vorname">
        </label>
        <label style="display: flex; flex-direction: column">Nachname:
          <input required type="text" v-model="nachname" placeholder="nachname">
        </label>
      </div>
      <label class="username" style="display: flex; flex-direction: column">
        Username:
        <input required type="text" v-model="username" placeholder="username">
      </label>
      <label class="password" style="display: flex; flex-direction: column">
        Password:
        <input required type="password" v-model="password" placeholder="password">
      </label>
      <input :disabled="!isComplete" type="button" @click="register" value="Register">
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