<template>
  <div
    class="project-logo flex justify-center items-center flex-col md:flex-row md:space-x-7 mx-auto"
    aria-label="Rust-Platz"
  >
    <div class="flex-grow">
      <img class="ml-auto project-logo__rust-logo" src="../assets/rust.svg" alt="Logo von Rust">
    </div>
    <div class="h-3 mt-3 -mb-5 md:m-0 md:h-40 project-logo__separator"/>
    <div class="flex-grow font-bold uppercase">
      Platz
    </div>
  </div>
</template>

<style scoped>
  .project-logo {
    filter: brightness(140%);
    color: #999999;
    font-size: 5rem;
  }

  .project-logo__rust-logo {
    width: 300px;
  }

  .project-logo__separator {
    background: #999999;
    width: 300px;
  }

  @screen md {
    .project-logo {
      transform: translateX(-5px);
      font-size: 5rem;
    }

    .project-logo__separator {
      @apply w-6;
    }
  }

  @screen xl {
    .project-logo {
      transform: translateX(40px);
      font-size: 8rem;
    }

    .project-logo__rust-logo {
      width: 400px;
    }
  }
</style>

<script>
  export default {
    name: "ProjectLogo"
  }
</script>
