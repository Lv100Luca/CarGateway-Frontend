<script setup lang="ts">
import {useUserDataStore} from "@/stores/userDataStore";
import type UserResponseDTO from "@/DTO/UserResponseDTO";
import APIClient from "@/API/APIClient";
import {getStringsFromRoles} from "@/components/models/Role";
import {onMounted, ref, watch} from "vue";
import type ReservierungResponseDTO from "@/DTO/ReservierungResponseDTO";
import ReservationDisplayItem from "@/components/ReservationDisplayItem.vue";
import type {UserReservierungDTO} from "@/DTO/UserReservierungDTO";
import PageSelector from "@/components/PageSelector.vue";


const userData = useUserDataStore();
const user = userData.user;

const nrOfElementsOnPage = ref(5);
const nrOfPage = ref(0);
const nrOfTotalElements = ref(4);
const pageLimit = ref((nrOfTotalElements.value / nrOfElementsOnPage.value) - 1);

const reservations = ref<UserReservierungDTO[]>([]);
const selectedReservationId = ref(-1);
onMounted(() => {
  loadPage();
})
watch(nrOfElementsOnPage, () => {
  nrOfPage.value = 0;
});

watch(nrOfPage, () => {
  loadPage();
})


async function updateUser() {
  const response = await APIClient.patchRequest<UserResponseDTO>("/user/alter", true, user
  ); //todo change how this works maybe | maybe make changes here directly effect logged in User
  if (response) {

    console.log("Name Changed, fetching self")
    await userData.fetchSelf();
  }
}

async function loadPage() {
  const endpoint = "/reservierung?pagenr=" + nrOfPage.value + "&pagesize=" + nrOfElementsOnPage.value;
  const response = await APIClient.getRequest<ReservierungResponseDTO>(endpoint, true);
  if (response != null) {
    console.log(response)
    reservations.value = response.content;
    nrOfTotalElements.value = response.nrOfTotalElements;
  }
}

async function deleteReservation() {
  const response = await APIClient.deleteRequest("/reservierung/" + selectedReservationId.value, true);
  if (response) {
    console.log("Reservation deleted: " + selectedReservationId.value)
  } else {
    console.log("Reservation not deleted " + selectedReservationId.value)
  }
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
      <pre>{{reservations}}</pre>

        <PageSelector class="selector" :page-limit="pageLimit" @PageNr="args => nrOfPage = args"></PageSelector>
        <ReservationDisplayItem class="displayItem" v-for="reservation in reservations" :reservation="reservation"
                                :key="reservation.reservierungsId" @reserverungsID="id => selectedReservationId = id"
                                :class="{ 'highlighted': selectedReservationId === reservation.reservierungsId }"/>
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
  /* Add your highlight style here */
  background-color: #D3D3D3;
}

.role {
  width: 23.1rem;
}
.selector {
  width: 50%;
}
</style>