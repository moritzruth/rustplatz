<template>
  <template v-if="isStreamer">
    <a
      :href="`https://twitch.tv/${getMemberProperty(member, 'twitch')}`"
      class="text-gray-200 flex space-x-2 can-hover:space-x-1 overflow-hidden relative whitespace-nowrap"
      target="_blank"
      rel="noopener noreferrer"
      @click.passive="umami(getMemberProperty(member, 'twitch'), 'twitch')"
    >
      <span class="overflow-ellipsis overflow-hidden">
        {{ getMemberProperty(member, showInGameNames ? "game" : "displayed") }}
      </span>
      <InfoIcon
        v-if="additionalInfo !== null"
        ref="infoIconElement"
        tabindex="0"
        stroke-width="3"
        size="1x"
        class="flex-shrink-0 relative can-hover:top-0.5 text-xl can-hover:text-base"
        @click.prevent
      />
    </a>
  </template>
  <span v-else class="overflow-ellipsis overflow-hidden">{{ member }}</span>
</template>

<script>
  import { InfoIcon } from "@zhuowenli/vue-feather-icons"
  import tippy from "tippy.js"
  import { ref, computed, watch, watchEffect, toRef, onBeforeUnmount } from "vue"
  import { getMemberProperty } from "../assets/get-member-property.js"
  import "tippy.js/dist/tippy.css"
  import { store } from "../assets/globals.js"

  export default {
    name: "TeamMember",
    components: { InfoIcon },
    props: {
      member: {
        type: null,
        validate: value => typeof value === "string" || typeof value === "object",
        required: true
      },
      isStreamer: Boolean
    },
    setup(props) {
      const infoIconElement = ref(null)
      const tooltip = ref(null)

      const additionalInfo = computed(() => {
        const displayed = getMemberProperty(props.member, "displayed")
        const twitch = getMemberProperty(props.member, "twitch")
        const game = getMemberProperty(props.member, "game")

        const html = (displayed === twitch ? "" : `<span class="font-bold">Twitch:</span> ${twitch}<br>`) +
          (displayed === game
            ? ""
            : (store.showInGameNames
              ? `<span class="font-bold">Normal:</span> ${displayed}`
              : `<span class="font-bold">In-Game:</span> ${game}`))

        return html === "" ? null : `<span class="text-lg">${html}</span>`
      })

      watchEffect(() => {
        tooltip.value?.setContent(additionalInfo.value)
      })

      watch(infoIconElement, () => {
        if (infoIconElement.value !== null) tooltip.value = tippy(infoIconElement.value.$el, {
          content: additionalInfo.value,
          allowHTML: true
        })
      })

      onBeforeUnmount(() => {
        tooltip.value?.destroy()
      })

      return {
        infoIconElement,
        additionalInfo,
        showInGameNames: toRef(store, "showInGameNames")
      }
    },
    methods: {
      getMemberProperty
    }
  }
</script>
