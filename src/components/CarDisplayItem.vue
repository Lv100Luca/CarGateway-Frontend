<script setup lang="ts">
import type CarDTO from "@/DTO/CarDTO";


const props = defineProps({
  car: {
    type: Object as () => CarDTO,
    required: true
  }
})
const emits = defineEmits(['carID']);
</script>
<template>
  <div class="wrapper" @click="emits('carID', props.car!.id)">
    <div class="left">
      <h1>{{ props.car!.id }}</h1>
    </div>
    <a class="v-border"/>
    <div class="right">
      <div class="information">
        <h3>{{ props.car!.name }}</h3>
      </div>
      <a class="h-border"/>
      <div class="time">
        <h3>{{props.car!.standort.id }}</h3>
        <h3>{{ props.car!.standort.name }}</h3>
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