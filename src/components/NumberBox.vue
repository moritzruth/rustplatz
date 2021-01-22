<template>
  <transition name="slide-y">
    <div v-if="show" class="number-box max-w-full overflow-hidden">
      <div class="max-w-sm h-full mx-auto theme-border p-5 text-center">
        <span class="font-bold text-3xl block mt-1">{{ title }}</span>
        <span class="block text-5xl text-green-400 mt-6">
          <slot/>
        </span>
      </div>
    </div>
  </transition>
</template>

<style scoped>
  .number-box {
    height: 145px;
  }
</style>

<script>
  export default {
    name: "NumberBox",
    props: {
      title: {
        type: String,
        required: true
      },
      show: Boolean
    }
  }
</script>
