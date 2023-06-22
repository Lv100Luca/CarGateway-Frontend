<script setup lang="ts">
import {useUserDataStore} from "@/stores/userDataStore";
import {getHighestRole, Role} from "@/components/models/Role";
import {useRouter} from "vue-router";
import {onMounted} from "vue";
import APIClient from "@/API/APIClient";

const userDataStore = useUserDataStore();
const router = useRouter();

onMounted(async () => {
  if (userDataStore.hasUser) {
    userDataStore.logout();
    console.log("Logged Out User")
    await router.push("/")
  }
})
</script>

<template>
  <h1>Logout</h1>
</template>
<style>

</style>