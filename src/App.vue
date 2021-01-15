<template>
  <header>
    <ProjectLogo/>
    <div class="project-description">
      Rust-Streamerserver von Bonjwa, RocketBeans und Dhalucard.
    </div>
  </header>
  <main class="content">
    <h1 class="heading">Teams</h1>
    <span v-if="teams === null">Lädt...</span>
    <div v-else class="teams">
      <TeamCard v-for="team in teams" :key="team.name" :team="team"/>
    </div>
  </main>
  <footer class="footer">
    Created by <a href="https://moritzruth.de">Moritz Ruth</a>.
  </footer>
</template>

<style>
  body {
    background: #212121;
    color: #E9E9E9;
    padding: 40px;

    font-family: "Goldman", sans-serif;
    overflow-x: hidden;
  }

  .content {
    max-width: 100%;
    width: 1500px;
    margin: 0 auto;
  }

  .project-description {
    text-align: center;
    margin-top: 40px;
    font-size: 1.5rem;
  }

  .heading {
    font-weight: bold;
    font-size: 4rem;
    margin-bottom: 20px;
  }

  .teams {
    column-count: 4;
    column-gap: 20px;
  }

  .team-card {
    margin-bottom: 20px;
    break-inside: avoid;
  }

  @media (max-width: 1000px) {
    .teams {
      column-count: 2;
    }
  }

  @media (max-width: 600px) {
    .teams {
      column-count: 1;
    }
  }

  .footer {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    text-align: center;
  }

  .footer > a {
    text-decoration: none;
    color: #7EFF93;
  }
</style>

<script>
  import ProjectLogo from "./components/ProjectLogo.vue"
  import TeamCard from "./components/TeamCard.vue"

  export default {
    name: "App",
    components: { TeamCard, ProjectLogo },
    data: () => ({
      teams: null
    }),
    async created() {
      // eslint-disable-next-line no-undef
      this.teams = process.env.NODE_ENV === "development"
        ? []
        : await (await fetch("/.netlify/functions/teams")).json()
    }
  }
</script>
