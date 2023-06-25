<script setup lang="ts">
import type UserResponseDTO from "@/DTO/UserResponseDTO";
import {getHighestRole} from "./models/Role";

const props = defineProps({
  user: UserResponseDTO
})
// const emits = defineEmits(['userID']);
</script>
<template>
  <div class="wrapper" @click="user!.id">
    <div class="left">
      <h1>{{user!.id}}</h1>
    </div>
    <a class="v-border"/>
    <div class="right">
      <div class="role-bottom">
        <h3>{{user!.username}}</h3>
        <h3>{{getHighestRole(user!.rollen)}}</h3>
      </div>
      <a class="h-border"/>
      <div class="name-top">
        <h3>{{user!.vorname}}</h3>
        <h3>{{user!.nachname}}</h3>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  border: gray 2px solid;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
}

.left {
  display: flex;
  justify-content: center;
  width: 25%;
}

.right {
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.name-top, .role-bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.v-border {
  border-right: gray 1px solid;
}

.h-border {
  border-top: gray 1px solid;
}

</style>