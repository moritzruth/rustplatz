<template>
  <div
    class="theme-border p-4 md:p-8 transition duration-500 ease-in-out transform-gpu relative
           hover:scale-103 hover:shadow-2xl"
  >
    <span class="text-2xl">{{ team.name }}</span>
    <a
      class="absolute bottom-2 right-2 opacity-0 transition-opacity duration-200"
      :class="showMultitwitch && 'opacity-100'"
      :href="`https://multitwitch.tv/${onlineTwitchNames.join('/')}`"
    >
      Multitwitch
    </a>
    <TeamMemberList
      class="transition-all duration-1000 ease-in-out"
      :online="team.online"
      :offline="team.offline"
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
      onlineTwitchNames: vm => [...new Set(vm.team.online.map(member => getMemberProperty(member, "twitch")))],
      showMultitwitch: vm => vm.onlineTwitchNames.length > 1,
      marginBottom() {
        let value = 0
        if (this.team.offline.length === 0 || this.team.online.length === 0) value -= 35
        return value + "px"
      }
    }
  }
</script>
