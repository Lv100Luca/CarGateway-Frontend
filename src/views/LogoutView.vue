<script setup lang="ts">
import {useUserDataStore} from "@/stores/userDataStore";
import {getHighestRole, Role} from "@/components/models/Role";
import {useRouter} from "vue-router";
import {onMounted} from "vue";

const userDataStore = useUserDataStore();
const router = useRouter();

onMounted(async () => {
  if (userDataStore.isAuthenticated) {
    await logout();
    console.log("Logged Out User")
  }
})

async function resetState() {
  userDataStore.username = "";
  userDataStore.id = -1;
  userDataStore.role = Role.none;
  userDataStore.isAuthenticated = false;
  userDataStore.token = "";
}

async function logout() {

  await resetState();
  await router.push("/")
}
</script>

<template>
  <h1>Logout</h1>
</template>
<style>

</style>