<script setup lang="ts">
import type {UserReservierungDTO} from "@/DTO/UserReservierungDTO";

const props = defineProps({
  reservation: {
    type: Object as () => UserReservierungDTO,
    required: true
  }
})
const emits = defineEmits(['reserverungsID']);

function getDateString(date: Date): string {
  let day: string = ('0' + date.getDate()).slice(-2);
  let month: string = ("0" + (date.getMonth() + 1));
  let year: string = date.getFullYear().toString();
  let hour: string = ("0" + date.getHours()).slice(-2);
  let min: string = ("0" + date.getMinutes()).slice(-2);

  return `${day}.${month}.${year} - ${hour}:${min}`;
}

</script>
<template>
  <div class="wrapper" @click="$emit('reserverungsID', reservation.reservierungsId)">
    <div class="left">
      <h1>{{ reservation.reservierungsId }}</h1>
    </div>
    <a class="v-border"/>
    <div class="right">
      <div class="information">
        <h3>{{ reservation.fahrzeugDTO.fahrzeugID }}</h3>
        <h3>{{ reservation.fahrzeugDTO.fahrzeugName }}</h3>
      </div>
      <hr>
      <div class="standort">
        <h3>{{ reservation.fahrzeugDTO.standortName }}</h3>
      </div>
      <hr>
      <div class="time">
        <h3>{{ getDateString(new Date(reservation.startZeitpunkt)) }} to
          {{ getDateString(new Date(reservation.endZeitpunkt)) }}</h3>
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
  height: 6rem;
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

.time, .information, .standort {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 33%;
}

.v-border {
  border-right: gray 2px solid;
}
</style>