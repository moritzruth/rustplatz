<template>
  <div class="teams-list space-y-8">
    <TeamCard
      v-for="team in teams"
      :key="team.id"
      class="teams-list__card"
      :team="team"
    />
  </div>
</template>

<style scoped>
  .teams-list {
    column-count: 1;
    column-gap: 30px;
  }

  .teams-list__card {
    break-inside: avoid;
  }

  @screen md {
    .teams-list {
      column-count: 2;
    }
  }

  @screen xl {
    .teams-list {
      column-count: 3;
    }
  }

  @screen 2xl {
    .teams-list {
      column-count: 4;
    }
  }
</style>

<script>
  import TeamCard from "./TeamCard.vue"

  export default {
    name: "TeamsList",
    components: { TeamCard },
    props: {
      teams: {
        type: Array,
        required: true
      }
    }
  }
</script>
