<template>
  <div
    class="theme-border p-5 py-6 lg:p-7 transition duration-500 ease-in-out transform-gpu relative
           hover:scale-101 can-hover:hover:scale-103 hover:shadow-2xl"
  >
    <span class="text-2xl block">{{ team.name }}</span>
    <a
      class="absolute bottom-2 right-2 opacity-0 transition-opacity duration-200 text-green-400 text-base"
      :class="showMultitwitch && 'opacity-100'"
      :href="`https://multitwitch.tv/${onlineTwitchNames.join('/')}`"
      @click.passive="umami(team.id, 'multitwitch')"
    >
      MULTI
    </a>
    <TeamMemberList
      class="transition-all duration-1000 ease-in-out"
      :live="team.live"
      :offline="team.offline"
      :non-streamers="team.nonStreamers"
      :style="{ marginBottom }"
    />
  </div>
</template>

<script>
  import { getMemberProperty } from "../assets/get-member-property"
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
      onlineTwitchNames: vm => [...new Set(vm.team.live.map(member => getMemberProperty(member, "twitch")))],
      showMultitwitch: vm => vm.onlineTwitchNames.length > 1,
      marginBottom() {
        const missing = [this.team.offline, this.team.live, this.team.nonStreamers]
          .map(list => list.length === 0)
          .filter(v => v).length

        return (missing * -35) + "px"
      }
    }
  }
</script>
