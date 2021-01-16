<template>
  <div class="team-card-container">
    <div class="team-card">
      <span class="team-name">{{ team.name }}</span>
      <TeamMemberList :online="team.online" :offline="team.offline"/>
    </div>
  </div>
</template>

<style scoped>
  .team-card-container {
    padding-top: 2px;
    padding-bottom: 30px;
  }

  .team-card {
    border: 4px dashed #C95847;
    padding: 20px;

    transition: 400ms ease;
  }

  .team-card:hover {
    box-shadow: 0 2px 40px 0 rgba(0, 0, 0, 0.4);
  }

  .team-name {
    display: block;
    font-size: 1.6rem;
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
