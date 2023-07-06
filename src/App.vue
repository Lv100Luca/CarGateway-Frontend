<script setup lang="ts">

import NavBar from "@/components/NavBar.vue";
import {onMounted} from "vue";
import {useUserDataStore} from "@/stores/userDataStore";

const userData = useUserDataStore();
onMounted(async () => await userData.fetchSelf());
</script>

<template>
  <NavBar/>
  <RouterView/>
</template>

<style scoped>

</style>
