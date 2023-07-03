<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useUserDataStore} from "@/stores/userDataStore";
import type GetCarsResponseDTO from "@/DTO/GetCarsResponseDTO";
import APIClient from "@/API/APIClient";
import type GetCarsWithPagesResponseDTO from "@/DTO/GetCarsWithPagesResponseDTO";
import PageSelector from "@/components/PageSelector.vue";
import UserDisplayItem from "@/components/UserDisplayItem.vue";
import CarDisplayItem from "@/components/CarDisplayItem.vue";
import {useRouter} from "vue-router";

const router = useRouter();
const userDataStore = useUserDataStore();
const listOfCarsPages = ref<GetCarsResponseDTO[]>([]);
const nrOfElementsOnPage = ref(2);
const nrOfPage = ref(0);
const nrOfTotalElements = ref(4);

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

</template>

<style scoped>
</style>
