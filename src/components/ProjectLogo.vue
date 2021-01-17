<template>
  <div class="project-logo" aria-label="Rust-Platz">
    <div class="logo-container">
      <img class="rust-logo" src="../assets/rust.svg" alt="Logo von Rust">
    </div>
    <div class="separator"/>
    <div class="text">
      Platz
    </div>
  </div>
</template>

<style scoped>
  .project-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    filter: brightness(140%);
    transform: translateX(40px);
  }

  .logo-container {
    flex-grow: 1;
  }

  .rust-logo {
    width: 400px;
    margin-left: auto;
    display: block;
  }

  .separator {
    width: 30px;
    height: 200px;
    margin: 0 60px;
    background: #999999;
  }

  .text {
    color: #999999;
    font-size: 8rem;
    flex-grow: 1;
    font-weight: bold;

    text-transform: uppercase;
  }

  @media (max-width: 1200px) {
    .project-logo {
      transform: translateX(-5px);
    }

    .rust-logo {
      width: 300px;
    }

    .text {
      font-size: 5rem;
    }
  }

  @media (max-width: 860px) {
    .project-logo {
      flex-direction: column;
      transform: none;
    }

    .separator {
      height: 10px;
      width: 300px;
      margin: 25px 0 5px;
    }

    .rust-logo {
      width: 300px;
    }

    .text {
      font-size: 5rem;
    }
  }
</style>

<script>
  export default {
    name: "ProjectLogo"
  }
</script>
