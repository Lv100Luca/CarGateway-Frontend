<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useUserDataStore} from "@/stores/userDataStore";
import type CarDTO from "@/DTO/CarDTO";
import APIClient from "@/API/APIClient";
import type CarResponseDTO from "@/DTO/CarResponseDTO";
import {useRouter} from "vue-router";
import CarDisplayItem from "@/components/CarDisplayItem.vue";
import PageSelector from "@/components/PageSelector.vue";
import CarReservationModal from "@/components/Modal/CarReservationModal.vue";

const router = useRouter();
const userDataStore = useUserDataStore();
const listOfCarsPages = ref<CarDTO[]>([]);
const nrOfElementsOnPage = ref(4);
const nrOfPage = ref(0);
const nrOfTotalElements = ref(4);
const selectedCar = ref<CarDTO | null>(null);
const showModal = ref(false);
const pageLimit = ref((nrOfTotalElements.value / nrOfElementsOnPage.value) - 1);

onMounted(async () => {
  if (userDataStore.hasUser) {
    await loadPage();
  } else {
    await router.push("/welcome");
  }
})
watch(nrOfElementsOnPage, () => {
  nrOfPage.value = 0;
});

watch(nrOfPage, () => {
  loadPage();
})

function selectCar(carID: number) {
  selectedCar.value = listOfCarsPages.value.find(car => car.id === carID) ?? null;
  if (selectedCar.value === null) {
    return;
  }
  showModal.value = true;
}

async function loadPage() {
  const endpoint = "/fahrzeuge?pagenr=" + nrOfPage.value + "&pagesize=" + nrOfElementsOnPage.value;
  const response = await APIClient.getRequest<CarResponseDTO>(endpoint, true);
  if (response != null) {
    listOfCarsPages.value = response.content;
    nrOfTotalElements.value = response.nrOfTotalElements;
  }
}
</script>

<template>
  <div>
    <CarReservationModal :car="selectedCar!" :show="showModal" @close="showModal = false"
                         @success="loadPage"></CarReservationModal>
    <div class="page">
      <h1>420</h1>
      <h1>Cars</h1>
      <div class="cars">
        <CarDisplayItem v-for="car in listOfCarsPages" :car="car" :key="car.id" @carID="carID => selectCar(carID)"/>
      </div>
      <PageSelector class="selector" :page-limit="pageLimit" @PageNr="args => nrOfPage = args"></PageSelector>

    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5rem;
}

.cars {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
}

.selector {
  display: flex;
  height: 2rem;
  width: 50%;
}
</style>
