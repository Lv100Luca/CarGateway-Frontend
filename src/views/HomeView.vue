<script lang="ts" setup>
import {computed, onMounted, ref, watch} from "vue";
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
const cars = ref<CarDTO[]>([]);

const elementsPerPage = ref(5);
const page = ref(0);

const totalElements = ref(0);
const selectedCar = ref<CarDTO | null>(null);
const showModal = ref(false);
const pageLimit = computed(() => Math.ceil(totalElements.value / elementsPerPage.value) - 1);
const defaultCar: CarDTO = {"id": -1, "name": "null", "standort": {"id": -1, "name": "null"}}
onMounted(async () => {
  if (userDataStore.hasUser) {
    await loadPage();
  } else {
    await router.push("/welcome");
  }
})
watch(elementsPerPage, () => {
  page.value = 0;
});

watch(page, () => {
  loadPage();
})

function selectCar(carID: number) {
  selectedCar.value = cars.value.find(car => car.id === carID) ?? null;
  if (selectedCar.value === null) {
    return;
  }
  showModal.value = true;
}

async function loadPage() {
  const endpoint = "/fahrzeuge?pagenr=" + page.value + "&pagesize=" + elementsPerPage.value;
  const response = await APIClient.getRequest<CarResponseDTO>(endpoint, true);
  if (response != null) {

    if (response.content.length > 0) {
      cars.value = response.content;
      totalElements.value = response.nrOfTotalElements;
    }
  }
}
</script>

<template>
  <div>
    <CarReservationModal v-if="selectCar !== null" :car="selectedCar ?? defaultCar" :show="showModal"
                         @close="showModal = false"
                         @success="loadPage"></CarReservationModal>
    <div class="page">
      <h1>Cars</h1>
      <PageSelector :page-limit="pageLimit" class="selector" @PageNr="args => page = args"></PageSelector>
      <div class="cars">
        <CarDisplayItem v-for="car in cars" :key="car.id" :car="car" @carID="carID => selectCar(carID)"/>
      </div>

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
