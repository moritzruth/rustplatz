<template>
  <div
    class="wipe-overlay bg-black fixed top-0 left-0 w-screen h-screen flex items-center justify-center flex-col p-10
           transition"
    :class="date === null ? 'opacity-0 pointer-events-none' : 'opacity-100'"
  >
    <transition name="fade" mode="out-in">
      <div v-if="countdown !== null">
        <span class="block text-center text-lg mb-2 md:text-2xl md:mb-5">Season 2</span>
        <span class="text-4xl md:text-big">{{ countdown }}</span>
      </div>
      <div v-else class="text-3xl md:text-5xl">
        Season 2 hat begonnen.
      </div>
    </transition>
    <p class="text-base absolute bottom-0 p-10 text-center invisible xl:visible">
      Für <strong>offizielle</strong> Mitspieler: Meldet euch gerne schon vor dem Restart
      <a href="https://twitter.com/moritz_ruth" class="text-blue-400">bei mir</a>, damit ihr von Anfang an auf der
      Liste steht.<br>
      Fragt mich nicht, ob ihr mitspielen dürft! Ich kann das nicht entscheiden, ich mache nur diese Webseite!
    </p>
  </div>
</template>

<style scoped>
  .wipe-overlay {
    transition-duration: 5s;
  }
</style>

<script>
  import { ref, watchEffect } from "vue"
  import { useRafFn } from "@vueuse/core"

  export default {
    name: "WipeOverlay",
    props: {
      date: {
        type: null,
        required: true,
        validate: value => value === null || value instanceof Date
      }
    },
    setup(props) {
      const countdown = ref(null)

      const { start, stop } = useRafFn(() => {
        const distance = props.date.getTime() - Date.now()

        if (distance < 0) {
          countdown.value = null
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24))
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((distance % (1000 * 60)) / 1000)

          countdown.value =
            `${days.toString().padStart(2, "0")}:${hours.toString().padStart(2, "0")}:` +
            `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        }
      }, {
        immediate: props.date !== null
      })

      watchEffect(() => {
        if (props.date === null) stop()
        else start()
      })

      return {
        countdown
      }
    }
  }
</script>
