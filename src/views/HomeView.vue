<script setup lang="ts">
import {ref, watch} from "vue";
import {useUserDataStore} from "@/stores/userDataStore";
import APIService from "@/API/APIService";
import type GetCarsResponseDTO from "@/DTO/GetCarsResponseDTO";

const name = ref();
const pw = ref();
const userDataStore = useUserDataStore();
const listOfCars = ref<GetCarsResponseDTO[]>([]);
const listOfCarsPages = ref<GetCarsResponseDTO[]>([]);
const nrOfElementsOnPage = ref(5);
const nrOfPage = ref(0);
const nrOfTotalElements = ref(4);

watch(nrOfElementsOnPage, () => {
  nrOfPage.value = 0;
});

watch(nrOfPage, () => {
  loadPage();
})

function getCars() {
  APIService.getCars(userDataStore.token).then(response => {
    listOfCars.value = response;
  })
}

function login() {
  APIService.ApiLogin(name.value, pw.value).then(response => {
        userDataStore.isAuthenticated = true;
        userDataStore.token = response.token;
        // userDataStore.role = response.roles; todo
        userDataStore.role = 3;
        loadPage();
      }
  )
}

function loadPage() {
  if (nrOfTotalElements.value == -1 || nrOfTotalElements.value / nrOfElementsOnPage.value > nrOfPage.value) {
    APIService.getPageWithSize(userDataStore.token, nrOfPage.value, nrOfElementsOnPage.value).then(response => {
      listOfCarsPages.value = response.content;
      nrOfTotalElements.value = response.nrOfTotalElements;
    });
    // console.log("Loading page")
  } else {

    console.log("YOU ARE BANNED")
    console.log(nrOfTotalElements.value / nrOfElementsOnPage.value);
    console.log(nrOfElementsOnPage.value);
    console.log(nrOfTotalElements.value);
    console.log(nrOfPage.value)
  }
}

function decrement() {
  if (nrOfPage.value != 0) {
    nrOfPage.value--;
  }
}

function increment() {
  nrOfPage.value++;
}
</script>

<template>
  <div class="wrapper">
    <div class="login">
      <input type="text" placeholder="name:" v-model="name">
      <input type="password" placeholder="password:" v-model="pw">
      <input type="button" value="Login" @click="login()">
    </div>
    <div class="debug">
      <pre>{{ userDataStore }}</pre>
    </div>
    <div class="get">
      <input type="button" value="get Cars" @click="getCars()">
      <pre>{{ listOfCars }}</pre>
    </div>
    <div class="pages">
      <pre>{{ listOfCarsPages }}</pre>
      <div class="selector">
        <input type="button" value="" @click="decrement()">
        <label>{{ nrOfPage + 1 }}</label>
        <input type="button" value="" @click="increment()">
        <select v-model="nrOfElementsOnPage" @change="nrOfPage=0" :disabled="true">
          <option disabled value="">Please select one</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style>
.wrapper {
  height: 100%;
  width: 100dvw;
}
.login,.debug, .get, .pages {
  display: flex;
  flex-direction: column;
}

.selector {
  display: flex;
  flex-direction: row;
}
</style>
