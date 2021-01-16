<template>
  <div class="team-card-container">
    <div class="team-card">
      <span class="team-name">{{ team.name }}</span>
      <a
        class="multitwitch"
        :class="{ show: team.online.length !== 0 }"
        :href="`https://multitwitch.tv/${onlineTwitchNames.join('/')}`"
      >
        Multitwitch
      </a>
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
    position: relative;
  }

  .team-card:hover {
    box-shadow: 0 2px 40px 0 rgba(0, 0, 0, 0.4);
  }

  .team-name {
    display: block;
    font-size: 1.6rem;
  }

  .multitwitch {
    position: absolute;
    bottom: 10px;
    right: 10px;

    font-size: 1rem;
    text-decoration: none;
    color: #7EFF93;

    transition: 200ms ease opacity;
    opacity: 0;
  }

  .multitwitch.show {
    opacity: 1;
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
    },
    computed: {
      onlineTwitchNames() {
        return this.team.online.map(member => Array.isArray(member) ? member[1] : member)
      }
    }
  }
</script>
