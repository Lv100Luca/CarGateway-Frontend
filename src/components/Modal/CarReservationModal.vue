<script lang="ts" setup>
import {ref} from "vue";
import APIClient from "@/API/APIClient";
import type CarDTO from "@/DTO/CarDTO";
import type ReservierungDTO from "@/DTO/ReservierungDTO";
import {useUserDataStore} from "@/stores/userDataStore";

const props = defineProps({
  show: Boolean,
  car: {
    type: Object as () => CarDTO,
    required: true
  }
});
const emits = defineEmits(['close']);
const userData = useUserDataStore();


const dateFrom = ref(null);
const dateTo = ref(null);

async function bookReservation() {
  console.log(Date.parse(dateFrom.value!));
  console.log(Date.parse(dateTo.value!));
  let response;
  try {

    response = await APIClient.postRequest<ReservierungDTO, Response>("/reservierung", true, {
      "fahrzeugId": props.car.id,
      "userId": userData.user.id,
      "startZeitpunkt": Date.parse(dateFrom.value!),
      "endZeitpunkt": Date.parse(dateTo.value!)
    });
  } catch (e) {
    console.log("error in reservation");
    return;
  }
  if (response) {
    console.log("reservation ok");
    emits('close');
  } else {
    console.log("error in reservation");
  }
  dateFrom.value = null;
  dateTo.value = null;
}

</script>
<template>
  <div v-if="props.show" class="modal-mask">
    <div class="modal-container">
      <div class="modal-header">
        <h3> {{ car.name }} </h3>
      </div>
      <div class="modal-body">
        <div class="standort">
          <label>Standort:</label>
          <label>
            {{ car.standort.id }} | {{ car.standort.name }}
          </label>
        </div>
        <div class="date-from">
          <label>From:</label>
          <input type="datetime-local" v-model="dateFrom">
        </div>
        <div class="date-to">
          <label>To:</label>
          <input type="datetime-local" v-model="dateTo">
        </div>
        <input :disabled="!((dateTo ?? 1) > (dateFrom ?? 2))" type="button" value="Book" @click="bookReservation()">
        <input type="button" value="Close" @click="$emit('close')">

      </div>
    </div>
  </div>
</template>
<style scoped>
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
  width: 400px;
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

.standort {
  display: flex;
  flex-direction: column;
}

.date-from, .date-to {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.date-from > *, .date-to > * {
  width: 50%;
}
</style>