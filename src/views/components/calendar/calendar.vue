<template>
  <div class="calendar-box">
    <n-calendar
        v-model:value="value"
        #="{ year, month, date }"
        :is-date-disabled="isDateDisabled"
    >
      {{ year }}-{{ month }}-{{ date }}
    </n-calendar>
  </div>
</template>

<script setup lang="ts">
import { isYesterday, getDate } from 'date-fns/esm'
import {ref} from "vue";
const value = ref(getDate(new Date()).valueOf());
const  isDateDisabled = (timestamp: number) => {
  if (isYesterday(timestamp)) {
    return true
  }
  return false
}
</script>

<style scoped>

</style>