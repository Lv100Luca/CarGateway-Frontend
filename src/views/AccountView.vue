<script setup lang="ts">
import {useUserDataStore} from "@/stores/userDataStore";

const userData = useUserDataStore();
</script>

<template>
  <h1>Account</h1>
  <h2>{{userData.username}}</h2>
</template>
<style>

</style>