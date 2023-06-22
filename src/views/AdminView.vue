<script setup lang="ts">
import {useUserDataStore} from "@/stores/userDataStore";
import {onMounted, ref} from "vue";
import type UserResponseDTO from "@/DTO/UserResponseDTO";
import APIClient from "@/API/APIClient";
import type UserListResponseDTO from "@/DTO/UserListResponseDTO";

const userData = useUserDataStore();

const users = ref<UserResponseDTO[]>();

onMounted(async () => {
  const response = await APIClient.getRequest<UserListResponseDTO>("/user/getall?pagenr=0&pagesize=100", true);
  users.value = response.content;
})
</script>

<template>
  <h1>ADMIN Panel</h1>
  <pre>{{users}}</pre>
  <h2></h2>
</template>
<style>

</style>