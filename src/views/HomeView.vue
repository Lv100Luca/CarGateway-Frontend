<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useUserDataStore} from "@/stores/userDataStore";
import type GetCarsResponseDTO from "@/DTO/GetCarsResponseDTO";
import {useRouter} from "vue-router";
import APIClient from "@/API/APIClient";
import type GetCarsWithPagesResponseDTO from "@/DTO/GetCarsWithPagesResponseDTO";
import PageSelector from "@/components/PageSelector.vue";
import UserDisplayItem from "@/components/UserDisplayItem.vue";


const userDataStore = useUserDataStore();
const listOfCars = ref<GetCarsResponseDTO[]>([]);
const listOfCarsPages = ref<GetCarsResponseDTO[]>([]);
const nrOfElementsOnPage = ref(1);
const nrOfPage = ref(0);
const nrOfTotalElements = ref(4);
const router = useRouter();

const pageLimit = ref((nrOfTotalElements.value / nrOfElementsOnPage.value) - 1);

onMounted(async () => {
  if (userDataStore.hasUser) {
    loadPage();
  }
})
watch(nrOfElementsOnPage, () => {
  nrOfPage.value = 0;
});

watch(nrOfPage, () => {
  loadPage();
})


function loadPage() {
  const endpoint = "/fahrzeuge?pagenr=" + nrOfPage.value + "&pagesize=" + nrOfElementsOnPage.value;
  APIClient.getRequest<GetCarsWithPagesResponseDTO>(endpoint, true).then(response => {
    listOfCarsPages.value = response.content;
    nrOfTotalElements.value = response.nrOfTotalElements;
  })
}

console.log()

</script>

<template>
  <div class="wrapper">
    <label>{{ nrOfPage }}</label>
    <button @click="router.push('/admin')">ToAdmin</button>
    <div class="debug">
<!--      <pre>{{ userDataStore }}</pre>-->
    </div>
    <div class="get">
      <!--      <input type="button" value="get Cars" @click="getCars()">-->
      <pre>{{ listOfCars }}</pre>
    </div>
    <div class="pages">
      <pre>{{ listOfCarsPages }}</pre>
      <div class="selector">
        <PageSelector class="selector" :page-limit="pageLimit"
                      @PageNr="args => nrOfPage = args"></PageSelector>
      </div>
    </div>
    <UserDisplayItem v-if="userDataStore.hasUser" class="user-display" :id="userDataStore.user.id"
                     :username="userDataStore.user.username" :role="userDataStore.user.rollen"
                     :vorname="userDataStore.user.vorname" :nachname="userDataStore.user.nachname" :user="userDataStore.user"
                     @userID="id => console.log(id)"></UserDisplayItem>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
}

.selector {
  width: 20vw;
}

.debug, .get, .pages {
  display: flex;
  flex-direction: column;
}

.user-display {
  display: flex;
  width: 40vw;
}

</style>
