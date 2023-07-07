<script setup lang="ts">
import {useUserDataStore} from "@/stores/userDataStore";
import {useRouter} from "vue-router";
import {onMounted} from "vue";

const userDataStore = useUserDataStore();
const router = useRouter();

onMounted(async () => {
  if (userDataStore.hasUser) {
    userDataStore.logout();
    console.debug("Logged Out User")
    await router.push("/")
  }
})
</script>

<template>
  <h1>Logout</h1>
</template>
<style scoped>

</style>