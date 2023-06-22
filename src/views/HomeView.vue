<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useUserDataStore} from "@/stores/userDataStore";
import APIService from "@/API/APIService";
import type GetCarsResponseDTO from "@/DTO/GetCarsResponseDTO";
import {useRouter} from "vue-router";
import APIClient from "@/API/APIClient";
import type GetCarsWithPagesResponseDTO from "@/DTO/GetCarsWithPagesResponseDTO";


const name = ref();
const pw = ref();
const userDataStore = useUserDataStore();
const listOfCars = ref<GetCarsResponseDTO[]>([]);
const listOfCarsPages = ref<GetCarsResponseDTO[]>([]);
const nrOfElementsOnPage = ref(1);
const nrOfPage = ref(0);
const nrOfTotalElements = ref(4);
const router = useRouter();
let response = ref<GetCarsResponseDTO[]>([]);
onMounted(async () => {
  loadPage();
})
watch(nrOfElementsOnPage, () => {
  nrOfPage.value = 0;
});

watch(nrOfPage, () => {
  loadPage();
})

function getCars() {
  APIService.getPageWithSize(userDataStore.token, nrOfPage.value, nrOfElementsOnPage.value).then(response => {
    listOfCars.value = response.content;
    console.log(response.nrOfTotalElements)
  })
}


// function loadPage() {
//   if (nrOfTotalElements.value == -1 || nrOfTotalElements.value / nrOfElementsOnPage.value > nrOfPage.value) {
//     APIService.getPageWithSize(userDataStore.token, nrOfPage.value, nrOfElementsOnPage.value).then(response => {
//       listOfCarsPages.value = response.content;
//       nrOfTotalElements.value = response.nrOfTotalElements;
//     });
//   }
// }

function loadPage() {
  const endpoint = "/fahrzeuge?pagenr="+ nrOfPage.value + "&pagesize=" + nrOfElementsOnPage.value;
  if (true) {
    APIClient.getRequest<GetCarsWithPagesResponseDTO>(endpoint, true).then(response => {
      listOfCarsPages.value = response.content;
      nrOfElementsOnPage.value = response.nrOfTotalElements;
    })
  }
}

function decrement() {
  if (nrOfPage.value != 0) {
    nrOfPage.value--;
  }
}

function increment() {
  if (nrOfElementsOnPage.value * (nrOfPage.value + 1) < nrOfTotalElements.value) {
    nrOfPage.value++;
  }
}
</script>

<template>
  <div class="wrapper">
    <button @click="router.push('/admin')">ToAdmin</button>
    <div class="debug">
      <pre>{{ userDataStore }}</pre>
    </div>
    <div class="get">
      <input disabled="disabled" type="button" value="get Cars" @click="getCars()">
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

.login, .debug, .get, .pages {
  display: flex;
  flex-direction: column;
}

.selector {
  display: flex;
  flex-direction: row;
}
</style>
