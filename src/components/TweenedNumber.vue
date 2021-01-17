<template>
  {{ Math.floor(tweened.value) }}
</template>

<script>
  import TWEEN from "@tweenjs/tween.js"

  function animationLoop(time) {
    TWEEN.update(time)
    requestAnimationFrame(animationLoop)
  }

  requestAnimationFrame(animationLoop)

  export default {
    name: "TweenedNumber",
    props: {
      value: {
        type: Number,
        required: true
      }
    },
    data: () => ({
      tweened: { value: 0 }
    }),
    watch: {
      value: {
        immediate: true,
        handler(value) {
          new TWEEN.Tween(this.tweened)
            .to({ value }, 1500)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .onUpdate(() => {

            })
            .start()
        }
      }
    }
  }
</script>
