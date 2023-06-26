<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import type UserResponseDTO from "@/DTO/UserResponseDTO";
import APIClient from "@/API/APIClient";
import type UserListResponseDTO from "@/DTO/UserListResponseDTO";
import UserDisplayItem from "@/components/UserDisplayItem.vue";
import PageSelector from "@/components/PageSelector.vue";
import ChangeUserModal from "@/components/ChangeUserModal.vue";

const users = ref<UserResponseDTO[]>([]);
const selectedUser = ref<UserResponseDTO | null>(null);

const pageNr = ref(0);
const pageSize = 5;
const totalNrOfElements = ref(5);
const pageLimit = ref((totalNrOfElements.value / pageSize) - 1);

const showModal = ref(false);

onMounted(async () => {
  await loadUsers();
})
watch(pageNr, () => {
  loadUsers();
})

function getSelectedUser(userID: number): UserResponseDTO | null {
  return users.value!.find(user => user.id === userID) ?? null;
}

function selectUser(userID: number) {
  selectedUser.value = getSelectedUser(userID);
  showModal.value = true;
}

async function loadUsers() {
  const response = await APIClient.getRequest<UserListResponseDTO>("/user/getall?pagenr=" + pageNr.value + "&pagesize=" + pageSize, true);
  if (response != null) {
    users.value = response.content;
    totalNrOfElements.value = response.nrOfTotalElements;
    selectedUser.value = null;
  }
}

</script>

<template>
  <div>
    <ChangeUserModal :show="showModal" v-if="selectedUser !== null" :user="selectedUser"
                     @close="showModal = false" @success="loadUsers"></ChangeUserModal>
    <div class="admin-wrapper">
      <h1>ADMIN Panel</h1>
      <pre>Selected User: {{ selectedUser }}</pre>
      <PageSelector class="selector" :page-limit="pageLimit" @PageNr="args => pageNr = args"></PageSelector>
      <div class="users">
        <UserDisplayItem v-for="user in users" v-bind:user="user" @userID="userID => selectUser(userID)" :key="user.id"/>
      </div>
    </div>
  </div>
</template>
<style scoped>
.admin-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5rem;
}


.selector {
  display: flex;
  height: 2rem;
  width: 50%;
}

.users {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
}
</style>