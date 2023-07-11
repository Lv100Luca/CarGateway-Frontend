<script lang="ts" setup>
import type UserResponseDTO from "@/DTO/UserResponseDTO";
import {getStringsFromRoles} from "./models/Role";

const props = defineProps({
  user: {
    type: Object as () => UserResponseDTO,
    required: true
  }
})
const emits = defineEmits(['userID']);
</script>
<template>
  <div class="wrapper" @click="$emit('userID', props.user!.id)">
    <div class="left">
      <h1>{{ props.user!.id }}</h1>
    </div>
    <a class="v-border"/>
    <div class="right">
      <div class="information">
        <h3>{{ props.user!.username }}</h3>
        <h3>{{ getStringsFromRoles(props.user!.roles) }}</h3>
      </div>
      <a class="h-border"/>
      <div class="time">
        <h3>{{ props.user!.vorname }}</h3>
        <h3>{{ props.user!.nachname }}</h3>

      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  border: gray 3px solid;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  height: 4rem;
}

.left {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
}

.right {
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.time, .information {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.v-border {
  border-right: gray 2px solid;
}

.h-border {
  border-top: gray 2px solid;
}


</style>