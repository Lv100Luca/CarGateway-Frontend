<script setup lang="ts">
import {useUserDataStore} from "@/stores/userDataStore";
import type UserResponseDTO from "@/DTO/UserResponseDTO";
import APIClient from "@/API/APIClient";
import {computed, onMounted, ref, watch} from "vue";
import type ReservierungResponseDTO from "@/DTO/ReservierungResponseDTO";
import ReservationDisplayItem from "@/components/ReservationDisplayItem.vue";
import type {UserReservierungDTO} from "@/DTO/UserReservierungDTO";
import PageSelector from "@/components/PageSelector.vue";
import {getHighestRole, getStringsFromRoles, Role} from "@/components/models/Role";


const userData = useUserDataStore();
const user = userData.user;

const elementsPerPage = ref(5);
const page = ref(0);
const totalElements = ref(4);
const maxPage = computed(() => Math.ceil(totalElements.value / elementsPerPage.value) - 1);

const reservations = ref<UserReservierungDTO[]>([]);
const selectedReservationId = ref(-1);
onMounted(() => {
  loadPage();
})
watch(elementsPerPage, () => {
  page.value = 0;
});

watch(page, () => {
  loadPage();
})


async function updateUser() {
  const response = await APIClient.patchRequest<UserResponseDTO>("/user/alter", true, user
  ); //todo change how this works maybe | maybe make changes here directly effect logged in User
  if (response) {

    console.debug("Name Changed, fetching self")
    await userData.fetchSelf();
  }
}

async function loadPage() {
  if (getHighestRole(userData.user.roles) >= Role.user) {
    const endpoint = "/reservierung?pagenr=" + page.value + "&pagesize=" + elementsPerPage.value;
    const response = await APIClient.getRequest<ReservierungResponseDTO>(endpoint, true);
    if (response != null) {
      console.debug(response)
      reservations.value = response.content;
      totalElements.value = response.nrOfTotalElements;
    }
  }
}

async function deleteReservation() {
  const response = await APIClient.deleteRequest("/reservierung/" + selectedReservationId.value, true);
  if (response) {
    console.debug("Reservation deleted: " + selectedReservationId.value)
  } else {
    console.debug("Reservation not deleted " + selectedReservationId.value)
  }
  await loadPage();
  selectedReservationId.value = -1;
}
</script>

<template>
  <div class="account">
    <h1 class="title">Account</h1>
    <div class="data">
      <div class="identifiers">
        <label style="display: flex; flex-direction: column">ID:
          <input :value="user.id" disabled type="text">
        </label>
        <label style="display: flex; flex-direction: column">Username:
          <input :value="user.username" disabled type="text">
        </label>
      </div>
      <div class="standort">
        <label style="display: flex; flex-direction: column">Name:
          <input type="text" v-model="user.vorname">
        </label>
        <label style="display: flex; flex-direction: column">Surname:
          <input type="text" v-model="user.nachname">
        </label>
      </div>
      <label class="role" style="display: flex; flex-direction: column">Role:
        <input :value="getStringsFromRoles(user.roles)" disabled type="text">
      </label>
      <input type="button" value="Change Name" @click="updateUser()">
    </div>
    <div class="reservation">
      <h1>Reservations</h1>
      <div>
        <h2 v-if="selectedReservationId !== -1"></h2>
        <input @click="deleteReservation()" v-if="(selectedReservationId !== -1)" class="delete"
               type="button" :value="'Delete: ' + selectedReservationId">
      </div>
      <PageSelector v-if="reservations.length != 0" :page-limit="maxPage" class="selector"
                    @PageNr="args => page = args"></PageSelector>
      <ReservationDisplayItem v-for="reservation in reservations" :key="reservation.reservierungsId"
                              :class="{ 'highlighted': selectedReservationId === reservation.reservierungsId }"
                              :reservation="reservation" class="displayItem"
                              @reserverungsID="id => selectedReservationId = id"/>
    </div>
  </div>
</template>
<style scoped>
.account {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reservation {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.displayItem {
  width: 50%;
}

.data {
  outline: red 2px solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.identifiers, .standort {
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 30rem;
}

.highlighted {
  background-color: #D3D3D3;
}

.role {
  width: 23.1rem;
}

.selector {
  width: 50%;
}
</style>