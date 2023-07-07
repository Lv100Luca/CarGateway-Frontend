<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import type UserResponseDTO from "@/DTO/UserResponseDTO";
import APIClient from "@/API/APIClient";
import type UserListResponseDTO from "@/DTO/UserListResponseDTO";
import UserDisplayItem from "@/components/UserDisplayItem.vue";
import PageSelector from "@/components/PageSelector.vue";
import ChangeUserModal from "@/components/Modal/ChangeUserModal.vue";

const users = ref<UserResponseDTO[]>([]);
const selectedUser = ref<UserResponseDTO | null>(null);

const page = ref(0);
const elementsPerPage = 10;
const totalElements = ref(5);
const pageLimit = computed(() => Math.ceil(totalElements.value / elementsPerPage) - 1);

const showModal = ref(false);

onMounted(async () => {
  await loadUsers();
})
watch(page, () => {
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
  const response = await APIClient.getRequest<UserListResponseDTO>("/user/getall?pagenr=" + page.value + "&pagesize=" + elementsPerPage, true);
  if (response != null) {
    users.value = response.content;
    totalElements.value = response.nrOfTotalElements;
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
      <PageSelector class="selector" :page-limit="pageLimit" @PageNr="args => page = args"></PageSelector>
      <div class="users">
        <UserDisplayItem v-for="user in users" v-bind:user="user" @userID="userID => selectUser(userID)"
                         :key="user.id"/>
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