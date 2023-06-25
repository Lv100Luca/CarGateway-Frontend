<script setup lang="ts">
import {useUserDataStore} from "@/stores/userDataStore";
import {onMounted, ref, watch} from "vue";
import type UserResponseDTO from "@/DTO/UserResponseDTO";
import APIClient from "@/API/APIClient";
import type UserListResponseDTO from "@/DTO/UserListResponseDTO";
import UserDisplayItem from "@/components/UserDisplayItem.vue";
import PageSelector from "@/components/PageSelector.vue";

const userData = useUserDataStore();

const users = ref<UserResponseDTO[]>();
const selectedUser = ref();

const pageNr = ref(0);
const pageSize = 5;
const totalNrOfElements = ref(5);
const pageLimit = ref((totalNrOfElements.value / pageSize) - 1);


onMounted(async () => {
  await loadUsers();
})
watch(pageNr, () => {
  loadUsers();
})

async function loadUsers() {
  const response = await APIClient.getRequest<UserListResponseDTO>("/user/getall?pagenr=" + pageNr.value + "&pagesize=" + pageSize, true);
  users.value = response.content;
  totalNrOfElements.value = response.nrOfTotalElements;
  selectedUser.value = null;
}

</script>

<template>
  <div class="admin-wrapper">
    <h1>ADMIN Panel</h1>
    <pre>Selected User: {{ selectedUser }}</pre>
    <PageSelector class="selector" :page-limit="pageLimit" @PageNr="args => pageNr = args"></PageSelector>
    <div class="users">
      <UserDisplayItem v-for="user in users" v-bind:user="user" @userID="userID => selectedUser = userID"
                       :class="{ 'highlighted': selectedUser === user.id }"/>
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

.highlighted {
  /* Add your highlight style here */
  background-color: yellowgreen;
}
</style>