<script setup lang="ts">
import {useUserDataStore} from "@/stores/userDataStore";
import {onMounted, ref} from "vue";
import type {Role} from "@/components/models/Role";

const userData = useUserDataStore();
const selectedRole = ref<Role>(userData.role)
onMounted(async () => {
  if (userData.hasUser) {
    await userData.fetchSelf();
  }
})

function updateUser() {
  // todo
}

</script>

<template>
  <div class="account">
    <h1 class="title">Account</h1>
    <div class="data">
      <div class="identifiers">
        <label style="display: flex; flex-direction: column">ID:
          <input disabled="disabled" type="text" :value="userData.id">
        </label>
        <label style="display: flex; flex-direction: column">Username:
          <input disabled="disabled" type="text" :value="userData.username">
        </label>
      </div>
      <div class="name">
        <label style="display: flex; flex-direction: column">Name:
          <input type="text" :value="userData.vorname">
        </label>
        <label style="display: flex; flex-direction: column">Surname:
          <input type="text" :value="userData.nachname">
        </label>
      </div>
      <div class="role">
        <select class="role-select" v-model="selectedRole">
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
      <input type="button" value="UpdateUser" @click="updateUser()">

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

.identifiers, .name, .role {
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 30rem;
}


.role {
  margin-top: 1rem;
  width: 23.1rem;
}
.role-select {
  display: flex;
  width: 100%;
}
</style>