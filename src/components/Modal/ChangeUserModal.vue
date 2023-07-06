<script lang="ts" setup>
import type UserResponseDTO from "@/DTO/UserResponseDTO";
import {computed, ref} from "vue";
import {getRolesFromString, getStringsFromRoles} from "@/components/models/Role";
import APIClient from "@/API/APIClient";

const props = defineProps({
  show: Boolean,
  user: {
    type: Object as () => UserResponseDTO,
    required: true
  }
});
const emits = defineEmits(['close', 'success']);
const selectedRoles = ref(computed(() => getStringsFromRoles(props.user!.roles)).value);


// const vorname = ref(props.user!.vorname)
// const nachname = ref(props.user!.nachname)

async function changeUser() {
  const response = await APIClient.patchRequest<UserResponseDTO>("/user/change", true,
      {
        "id": props.user!.id,
        "username": props.user!.username,
        "vorname": props.user!.vorname,
        "nachname": props.user!.nachname,
        "roles": getRolesFromString(selectedRoles.value)
      } as UserResponseDTO);
  if (response) {
    console.log("Worked!");
    emits('success')
    emits("close")
  }
}


</script>
<template>
  <!--  <div v-if="props.show" class="modal-mask" @click="$emit('close')">-->
  <div v-if="props.show" class="modal-mask">
    <div class="modal-container">
      <div class="modal-header">
        <h2>{{ user.id }} / {{ user.username }}</h2>
      </div>
      <div class="modal-body">
        <div class="standort">
          <label>Vorname:
            <input :value="user.vorname" disabled type="text">
          </label>
          <label>Nachname:
            <input :value="user.nachname" disabled type="text">
          </label>
        </div>
        <label>Role:
          <select v-model="selectedRoles" multiple>
            <option>Admin</option>
            <option>Employee</option>
            <option>User</option>
            <option>None</option>
          </select>
        </label>
      </div>
      <input type="button" value="Change User" @click="changeUser()">
      <input type="button" value="Close" @click="$emit('close')">
    </div>
  </div>
</template>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.5s ease;
}

.modal-container {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-body {
  margin: 20px 0;
}
</style>