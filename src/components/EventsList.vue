<template>
  <ul class="space-y-4">
    <li v-for="(event, index) in events" :key="index">
      <span class="font-bold text-2xl text-yellow-300">{{ event.date }}</span>
      <div>{{ event.text }}</div>
    </li>
  </ul>
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
