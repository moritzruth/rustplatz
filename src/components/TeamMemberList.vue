<template>
  <transition-group name="list" tag="div" class="team-members-list">
    <template v-for="item in items" :key="Array.isArray(item) ? item[0] : item">
      <div>
        <span
          v-if="item === 'ONLINE'"
          class="separator online"
          :data-was-shown="last.showOnline"
          :data-show="showOnline"
        >
          Online
        </span>
        <span
          v-else-if="item === 'OFFLINE'"
          class="separator offline"
          :data-was-shown="last.showOffline"
          :data-show="showOffline"
        >
          Offline
        </span>
        <a
          v-else
          :href="`https://twitch.tv/${Array.isArray(item) ? item[1] : item}`"
          class="team-member"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ Array.isArray(item) ? item[0] : item }}
          <ExternalLinkIcon size="15" stroke-width="4"/>
        </a>
      </div>
    </template>
  </transition-group>
</template>

<style scoped>
  .list-move {
    transition: 1s ease transform;
  }

  .team-members-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .team-member {
    font-size: 1.3rem;
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

  .separator {
    display: block;
    font-size: 1.1em;
    margin-top: 0.4em;
    text-transform: uppercase;

    transition: 500ms ease opacity;
    opacity: 0;
  }

  .online {
    color: #7EFF93;
  }

  .offline {
    color: #F25C78;
  }

  .separator[data-show="true"][data-was-shown="false"] {
    animation: 1s ease fade-in normal both;
  }

  .separator[data-show="false"][data-was-shown="true"] {
    animation: 1s ease fade-in reverse both;
  }

  .separator[data-show="true"][data-was-shown="true"] {
    opacity: 1;
  }

  .separator[data-show="false"][data-was-shown="false"] {
    opacity: 0;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
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
    data: () => ({
      showOnline: true,
      showOffline: true,
      last: null
    }),
    computed: {
      items() {
        const start = []
        const end = []

        if (this.online.length === 0) end.push("ONLINE")
        else start.push("ONLINE", ...this.online)

        if (this.offline.length === 0) end.push("OFFLINE")
        else start.push("OFFLINE", ...this.offline)

        return [...start, ...end]
      }
    },
    watch: {
      items: {
        immediate: true,
        handler() {
          if (this.last !== null) this.last = {
            showOnline: this.showOnline,
            showOffline: this.showOffline
          }

          this.showOffline = this.offline.length !== 0
          this.showOnline = this.online.length !== 0

          if (this.last === null) this.last = {
            showOnline: this.showOnline,
            showOffline: this.showOffline
          }
        }
      }
    }
  }
</script>
