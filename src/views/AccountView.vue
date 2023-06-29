<script setup lang="ts">
import {useUserDataStore} from "@/stores/userDataStore";
import type UserResponseDTO from "@/DTO/UserResponseDTO";
import APIClient from "@/API/APIClient";
import {getStringsFromRoles} from "@/components/models/Role";

const userData = useUserDataStore();
const user = userData.user;

async function updateUser() {
  const response = await APIClient.patchRequest<UserResponseDTO>("/user/alter", true, user
  ); //todo change how this works maybe | maybe make changes here directly effect logged in User
  if (response) {
    console.log("Name Changed, fetching self")
    await userData.fetchSelf();
  }
}

</script>

<template>
  <pre>{{ user }}</pre>
  <div class="account">
    <h1 class="title">Account</h1>
    <div class="data">
      <div class="identifiers">
        <label style="display: flex; flex-direction: column">ID:
          <input disabled="disabled" type="text" :value="user.id">
        </label>
        <label style="display: flex; flex-direction: column">Username:
          <input disabled="disabled" type="text" :value="user.username">
        </label>
      </div>
      <div class="name">
        <label style="display: flex; flex-direction: column">Name:
          <input type="text" v-model="user.vorname">
        </label>
        <label style="display: flex; flex-direction: column">Surname:
          <input type="text" v-model="user.nachname">
        </label>
      </div>
      <label class="role" style="display: flex; flex-direction: column">Role:
        <input disabled="disabled" type="text" :value="getStringsFromRoles(user.roles)">
      </label>
      <input type="button" value="Change Name" @click="updateUser()">
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

.title {

}

.data {
  outline: red 2px solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.identifiers, .name {
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 30rem;
}


.role {
  width: 23.1rem;
}
</style>