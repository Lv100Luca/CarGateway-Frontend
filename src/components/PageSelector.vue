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
    <input class="page-nr" disabled="disabled" type="text" :value="pageNr + 1">
    <input class="button" :disabled="(pageNr >= props.pageLimit)" type="button" value="+" @click="increment()">
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
//width: 100%;
}
.button {
  width: 20%;
}
.page-nr {
  width: 60%;
}
.wrapper > * {
}
</style>