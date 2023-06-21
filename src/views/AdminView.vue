<script setup lang="ts">
  import {useUserDataStore} from "@/stores/userDataStore";

  const userData = useUserDataStore();
</script>

<template>
  <h1>ADMIN Panel</h1>
  <h2>{{userData.role}}</h2>
  <h2>{{userData.token}}</h2>
  <h2></h2>
</template>
<style>

</style>