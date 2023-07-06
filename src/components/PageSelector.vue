<script lang="ts" setup>

import {ref} from "vue";

const emits = defineEmits(["PageNr"]);
const props = defineProps({
  pageLimit: {
    type: Number,
    required: true,
    default: 5
  },
})
const pageNr = ref(0);

function increment() {
  pageNr.value++;
  emits('PageNr', pageNr.value);
}

function decrement() {
  pageNr.value--;
  emits('PageNr', pageNr.value);
}
</script>

<template>
  <div class="wrapper">
    <input class="button" :disabled="(pageNr <= 0)" type="button" value="-" @click="decrement()">
    <input :value="(pageNr + 1) + ' / ' + (Math.ceil(pageLimit) + 1)" class="page-nr" disabled type="text">
    <input class="button" :disabled="(pageNr >= props.pageLimit)" type="button" value="+" @click="increment()">
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.button {
  width: 20%;
}

.page-nr {
  width: 60%;
  text-align: center;
}

.wrapper > * {
}
</style>