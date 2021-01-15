<template>
  <div class="team-card">
    <span class="team-name">{{ team.name }}</span>
    <TeamMemberList :online="team.members.slice(0, 1)" :offline="team.members.slice(1)"/>
  </div>
</template>

<style scoped>
  .team-card {
    border: 4px dashed #C95847;
    padding: 20px;
  }

  .team-name {
    display: block;
    font-size: 1.8rem;
    margin-bottom: -5px;
  }
</style>

<script>
  import TeamMemberList from "./TeamMemberList.vue"

  export default {
    name: "TeamCard",
    components: { TeamMemberList },
    props: {
      team: {
        type: Object,
        required: true
      }
    }
  }
</script>
