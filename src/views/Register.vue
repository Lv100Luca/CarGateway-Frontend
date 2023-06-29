<script setup lang="ts">

import {ref} from "vue";

const vorname = ref("");
const nachname = ref("");
const username = ref("");
const password = ref("");

</script>

<template>
  <div class="wrapper">
    <form class="register-from">
      <h1>Register</h1>
      <div class="name">
        <label>Vorname:
          <input type="text" v-model="vorname" placeholder="vorname">
        </label>
        <label>Nachname:
          <input type="text" v-model="nachname" placeholder="nachname">
        </label>
      </div>
      <label class="username">
        Username:
        <input type="text" v-model="username" placeholder="username">
      </label>
      <label class="password">
        <input type="password" v-model="password" placeholder="password">
      </label>
    </form>
  </div>
</template>

<style>

</style>