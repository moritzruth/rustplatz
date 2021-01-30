<template>
  <ul class="space-y-4">
    <li v-for="(event, index) in events" :key="index">
      <span class="font-bold text-2xl text-yellow-300 block mb-2">{{ event.date }}</span>
      <span>{{ event.text }}</span>
    </li>
  </ul>
</template>

<script>
  const EVENTS = [
    {
      date: "Sonntag 31.1., 22 Uhr",
      text: "Autorennen"
    },
    {
      date: "Samstag 30.1., 22 Uhr",
      text: "Konzert von u. a. Balui und dem Rächer"
    },
    {
      date: "Mittwoch 3.2., 20 Uhr",
      text: "Season-Finale, danach Wipe und Pause bis 7.2."
    }
  ]

  export default {
    name: "EventsList",
    setup() {
      return {
        events: EVENTS
      }
    }
  }
</script>
