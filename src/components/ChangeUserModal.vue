<script lang="ts" setup>
import UserResponseDTO from "@/DTO/UserResponseDTO";
import {ref} from "vue";
import {
  getRoleStringFromRoleArraySoThatTobiStopsCryingAboutNonOrdinalRoles,
  turnRoleStringIntoNonOrdinalListOfStringWithRolesSoThatTobiIsHappy
} from "@/components/models/Role";
import APIClient from "@/API/APIClient";

const props = defineProps({
  show: Boolean,
  user: {
    type: Object as () => UserResponseDTO,
    required: true
  }
});
const selectedRole = ref(getRoleStringFromRoleArraySoThatTobiStopsCryingAboutNonOrdinalRoles(props.user!.rollen));

const vorname = ref(props.user!.vorname)
const nachname = ref(props.user!.nachname)

async function changeUser() {
  console.log(props.user!.rollen);
  props.user!.rollen = turnRoleStringIntoNonOrdinalListOfStringWithRolesSoThatTobiIsHappy(selectedRole.value);
  console.log(props.user!.rollen);
  const response = await APIClient.patchRequest<UserResponseDTO>("/user/change", true,
      {
        "id": props.user!.id,
        "username": props.user!.username,
        "vorname": vorname.value,
        "nachname": nachname.value,
        "roles": turnRoleStringIntoNonOrdinalListOfStringWithRolesSoThatTobiIsHappy(selectedRole.value)
      } as UserResponseDTO);
  if (response) {
    console.log("Worked!");
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
        <div class="name">
          <label>Vorname:
            <input type="text" v-model="vorname">
          </label>
          <label>Nachname:
            <input type="text" v-model="nachname">
          </label>
        </div>
        <label>Role:
          <select v-model="selectedRole">
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

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-button {
  float: right;
}
</style>