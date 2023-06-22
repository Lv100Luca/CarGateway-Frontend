<script setup lang="ts">
import {useUserDataStore} from "@/stores/userDataStore";
import {onMounted, ref} from "vue";
import type {Role} from "@/components/models/Role";
import type UserResponseDTO from "@/DTO/UserResponseDTO";
import APIClient from "@/API/APIClient";

const userData = useUserDataStore();

const id = ref(userData.id);
const username = ref(userData.username);
const vorname = ref(userData.vorname);
const nachname = ref(userData.nachname);
const role = ref(userData.role);


// onMounted(async () => {
//   if (userData.hasUser) {
//     await userData.fetchSelf();
//   }
// })

async function updateUser() {
  const response = await APIClient.patchRequest<UserResponseDTO>("/user/alter", true,
      {
        "id": id.value,
        "username": username.value,
        "vorname": vorname.value,
        "nachname": nachname.value,
        "rollen": [role.value]
      } as UserResponseDTO
  );
  if (response) {
    console.log("Name Changed, fetching self")
    await userData.fetchSelf();
  }
}

</script>

<template>
  <div class="account">
    <h1 class="title">Account</h1>
    <div class="data">
      <div class="identifiers">
        <label style="display: flex; flex-direction: column">ID:
          <input disabled="disabled" type="text" :value="id">
        </label>
        <label style="display: flex; flex-direction: column">Username:
          <input disabled="disabled" type="text" :value="username">
        </label>
      </div>
      <div class="name">
        <label style="display: flex; flex-direction: column">Name:
          <input type="text" v-model="vorname">
        </label>
        <label style="display: flex; flex-direction: column">Surname:
          <input type="text" v-model="nachname">
        </label>
      </div>
<!--      Todo: Convert RoleID into String-->
      <label class="role" style="display: flex; flex-direction: column">Role:
        <input disabled="disabled" type="text" :value="role">
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