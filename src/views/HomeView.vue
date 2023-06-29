<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useUserDataStore} from "@/stores/userDataStore";
import type GetCarsResponseDTO from "@/DTO/GetCarsResponseDTO";
import APIClient from "@/API/APIClient";
import type GetCarsWithPagesResponseDTO from "@/DTO/GetCarsWithPagesResponseDTO";
import PageSelector from "@/components/PageSelector.vue";
import UserDisplayItem from "@/components/UserDisplayItem.vue";
import CarDisplayItem from "@/components/CarDisplayItem.vue";


const userDataStore = useUserDataStore();
const listOfCarsPages = ref<GetCarsResponseDTO[]>([]);
const nrOfElementsOnPage = ref(2);
const nrOfPage = ref(0);
const nrOfTotalElements = ref(4);

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


async function loadPage() {
  const endpoint = "/fahrzeuge?pagenr=" + nrOfPage.value + "&pagesize=" + nrOfElementsOnPage.value;
  const response = await APIClient.getRequest<GetCarsWithPagesResponseDTO>(endpoint, true);
  if (response != null) {
    listOfCarsPages.value = response.content;
    nrOfTotalElements.value = response.nrOfTotalElements;
  }
}
</script>

<template>
  <div class="wrapper">
    <pre>{{userDataStore.state}}</pre>
    <div class="debug">
      <!--      <pre>{{ userDataStore }}</pre>-->
    </div>
    <div class="pages">
      <pre>{{ listOfCarsPages }}</pre>
      <div class="selector">
        <PageSelector class="selector" :page-limit="pageLimit"
                      @PageNr="args => nrOfPage = args"></PageSelector>
      </div>
    </div>
    <UserDisplayItem class="user-display" v-if="userDataStore.hasUser" :user="userDataStore.user"
                     @userID="id => console.log(id)"></UserDisplayItem>
    <br>
    <CarDisplayItem class="car-display" v-for="car in listOfCarsPages" :car="car" :key="car.id"
                    @carID="id => console.log(id)"></CarDisplayItem>
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

.debug, .pages {
  display: flex;
  flex-direction: column;
}

.user-display, .car-display {
  display: flex;
  width: 40vw;
}

</style>
