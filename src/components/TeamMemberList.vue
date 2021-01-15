<template>
  <ul class="team-members-list">
    <template v-for="item in items" :key="item">
      <li v-if="item === 'ONLINE'" class="separator-online">
        Online
      </li>
      <li v-else-if="item === 'OFFLINE'" class="separator-offline">
        Offline
      </li>
      <li v-else>
        <a
          :href="`https://twitch.tv/${item}`"
          class="team-member"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ item }}
          <ExternalLinkIcon size="15" stroke-width="4"/>
        </a>
      </li>
    </template>
  </ul>
</template>

<style scoped>
  .team-members-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .team-member {
    font-size: 1.5rem;
    font-weight: bold;
    color: inherit;
    text-decoration: none;
    margin-right: 5px;
  }

  .team-member .feather {
    opacity: 0;
    transition: 200ms ease opacity;
  }

  .team-member:hover .feather {
    opacity: 1;
  }

  .separator-online, .separator-offline {
    display: block;
    font-size: 1.1em;
    margin-top: 15px;
    text-transform: uppercase;
  }

  .separator-online {
    color: #7EFF93;
  }

  .separator-offline {
    color: #F25C78;
  }
</style>

<script>
  import { ExternalLinkIcon } from "@zhuowenli/vue-feather-icons"

  export default {
    name: "TeamMemberList",
    components: { ExternalLinkIcon },
    props: {
      online: {
        type: Array,
        required: true
      },
      offline: {
        type: Array,
        required: true
      }
    },
    computed: {
      items() {
        return ["ONLINE", ...this.online, "OFFLINE", ...this.offline]
      }
    }
  }
</script>
