<script setup lang="ts">
import APIClient from "@/API/APIClient";
import {onMounted, ref, watch} from "vue";
import type UserResponseDTO from "@/DTO/UserResponseDTO";
import UserDisplayItem from "@/components/UserDisplayItem.vue";
import PageSelector from "@/components/PageSelector.vue";
import {getHighestRole} from "@/components/models/Role";
import type UserListResponseDTO from "@/DTO/UserListResponseDTO";

const users = ref<UserResponseDTO[]>([]);
const selectedUser = ref<UserResponseDTO | null>(null);
const selectedID = ref(-1);
const pageNr = ref(0);
const pageSize = 10;
const totalNrOfElements = ref(5);
const pageLimit = ref((totalNrOfElements.value / pageSize) - 1);

onMounted(async () => {
  await loadUsers();
})

watch(pageNr, () => {
  loadUsers();
})

async function loadUsers() {
  const response = await APIClient.getRequest<UserListResponseDTO>("/user?pagenr=" + pageNr.value + "&pagesize=" + pageSize, true);
  if (response != null) {
    users.value = response.content;
    totalNrOfElements.value = response.nrOfTotalElements;
    selectedUser.value = null;
    selectedID.value = -1;
  }
}

function getSelectedUser(userID: number): UserResponseDTO | null {
  return users.value!.find(user => user.id === userID) ?? null;
}

function selectUser(userID: number) {
  selectedUser.value = getSelectedUser(userID);
  selectedID.value = userID;
}

async function activate() {
  const response = await APIClient.patchRequest("/user/activate/" + selectedUser.value!.id, true, {});
  if (response) {
    console.debug("Activated")
    await loadUsers();
  }
}


async function deactivate() {
  if (selectedUser.value!.roles.length != 0) {
    const response = await APIClient.patchRequest("/user/deactivate/" + selectedUser.value!.id, true, {});
    if (response) {
      console.debug("Deactivated")
      await loadUsers();
    }
  }
}
</script>
<template>
  <h1>Manage</h1>
  <div>
    <h2 v-if="selectedUser !== null">{{ selectedUser!.id }} / {{ selectedUser!.username }}</h2>
    <input @click="activate()" v-if="(selectedUser !== null) && selectedUser.roles.length == 0" class="activate"
           type="button" value="Activate">
    <input v-if="(selectedUser !== null) && getHighestRole(selectedUser.roles) == 1" class="deactivate"
           @click="deactivate()"
           type="button" value="Deactivate">
  </div>
  <PageSelector class="selector" :page-limit="pageLimit" @PageNr="args => pageNr = args"></PageSelector>
  <div class="users">
    <UserDisplayItem v-for="user in users" v-bind:user="user" @userID="userID => selectUser(userID)"
                     :class="{ 'highlighted': selectedID === user.id }"/>
  </div>
  <pre>Selected User: {{ selectedUser }}</pre>
</template>
<style scoped>
.activate {
  background-color: greenyellow;
}

.deactivate {
  background-color: red;
}

.highlighted {
  /* Add your highlight style here */
  background-color: #D3D3D3;
}
</style>