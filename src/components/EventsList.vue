<template>
  <template v-if="events.length !== 0">
    <ul class="space-y-4">
      <li v-for="(event, index) in events" :key="index">
        <span class="font-bold text-2xl text-yellow-300">{{ event.date }}</span>
        <div>{{ event.text }}</div>
      </li>
    </ul>
  </template>
  <span v-else class="italic">Keine</span>
</template>

<script>
  import { events } from "../assets/static-data.json"

  export default {
    name: "EventsList",
    setup() {
      return {
        events
      }
    }
  }
</script>
