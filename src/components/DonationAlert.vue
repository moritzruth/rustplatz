<template>
  <div
    class="invisible md:visible fixed top-5 right-5 w-72 opacity-0 transition-opacity duration-300"
    :class="modelValue && 'opacity-100 duration-1000'"
  >
    <a
      href="http://m0.is/donate"
      class="block backdrop-blur default-border text-lg p-4 bg-gray-800 bg-opacity-60 text-gray-100 shadow-xl"
      tabindex="-1"
    >
      Diese Seite kostet mich monatlich ca. 20€. Über
      <a href="http://m0.is/donate">eine kleine Spende</a>
      würde ich mich deshalb sehr freuen :)
    </a>
    <button
      class="mt-3 block ml-auto border-0 text-base rounded px-3 py-1 bg-gray-800 bg-opacity-50 backdrop-blur"
      @click="$emit('update:modelValue', false)"
    >
      Schließen
    </button>
  </div>
</template>

<script>
  export default {
    name: "DonationAlert",
    props: {
      modelValue: Boolean
    },
    emits: ["update:modelValue"]
  }
</script>
