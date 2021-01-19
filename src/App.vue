<template>
  <header class="pt-10 px-8">
    <ProjectLogo/>
    <div class="text-2xl text-center mt-5 md:mt-10">
      Rust-Streamerserver von Bonjwa, RocketBeans und Dhalucard
    </div>
    <div class="text-center mt-4 text-base">
      <p>Seite von <a href="https://twitter.com/moritz_ruth">@moritz_ruth</a>.</p>
      <p class="text">
        Schreibe mir gerne eine Twitter-Nachricht, wenn du ein Anliegen hast.
      </p>
    </div>
  </header>
  <main class="p-5 text-lg space-y-8">
    <transition name="slide-y">
      <div v-if="viewers > 1000" class="app__viewers-container mt-5 max-w-full overflow-hidden">
        <div class="max-w-sm h-full mx-auto default-border p-5 text-center">
          <span class="font-bold text-3xl block mt-1">total viewers</span>
          <span class="block text-5xl text-green-400 mt-6"><TweenedNumber :value="viewers"/></span>
        </div>
      </div>
    </transition>
    <section class="max-w-7xl w-full mx-auto">
      <h1 class="heading">Informationen</h1>
      <ul class="list-disc pl-4">
        <li>Der Server ist täglich von 15 Uhr bis 3 Uhr (morgens) online.</li>
        <li>Andere Spieler zu töten ist nur mit Role-Play erlaubt, <b>außer</b> in den sog. KOS-Zonen.</li>
        <li>Um mitspielen zu können, muss ein Streamer von einem der Teilnehmer eingeladen werden.</li>
        <li>Es gibt keinen Global Text-Chat, dafür Team Text-Chat und In-Game Voice-Chat.</li>
        <li>Teams umfassen maximal 6 Personen.</li>
        <li>Der Server wird monatlich zurückgesetzt (bedingt durch Updates).</li>
      </ul>
    </section>
    <section>
      <div class="max-w-7xl w-full mx-auto">
        <h1 class="heading">Teams</h1>
      </div>
      <div v-if="data === null" class="text-2xl max-w-7xl w-full mx-auto">
        Lädt...
      </div>
      <div v-else class="md:p-2">
        <TeamsList :teams="data.teams"/>
      </div>
      <p class="mt-5 max-w-7xl w-full mx-auto">
        Aktualisiert sich alle 60 Sekunden automatisch.
      </p>
    </section>
    <section class="text-lg max-w-7xl w-full mx-auto">
      <p>
        Diese Seite kostet mich monatlich ca. 20€. Über
        <a href="http://m0.is/donate">eine kleine Spende</a>
        würde ich mich deshalb sehr freuen :)<br>
      </p>
      <p>Genügend Spenden würden außerdem Folgendes ermöglichen:</p>
      <ul class="p-5 list-disc">
        <li>Aktualisieren der Informationen in kürzeren Zeitabständen [20,62€/Monat]</li>
        <li>Kurze Domain (rstpltz.gg) [99,90€/Jahr]</li>
        <li>Live-Benachrichtigungen [?]</li>
      </ul>
    </section>
  </main>
  <footer class="flex flex-col text-center px-4 py-2">
    <span>Inoffizielle Seite, erstellt von <a href="https://twitter.com/moritz_ruth">Moritz Ruth</a>.</span>
    <a href="https://github.com/moritzruth/rustplatz">Source Code</a>
  </footer>
  <DonationAlert v-model="showDonationAlert"/>
</template>

<style>
  .slide-y-enter-active,
  .slide-y-leave-active {
    transition: 1s ease-out;
    transition-property: opacity, max-height;
  }

  .slide-y-enter-to, .slide-y-leave {
    max-height: 145px;
  }

  .slide-y-enter-from,
  .slide-y-leave-to {
    opacity: 0;
    max-height: 0;
  }

  ::selection {
    background: rgba(242, 92, 120, 0.7);
  }

  body {
    @apply bg-gray-900 text-gray-200 overflow-x-hidden;
  }

  a {
    @apply text-green-400;
  }

  .backdrop-blur {
    backdrop-filter: blur(10px);
  }

  .default-border {
    @apply border-4 border-dashed border-red-500;
  }

  .heading {
    @apply text-3xl md:text-5xl font-bold mb-5;
  }

  .app__viewers-container {
    height: 145px;
  }
</style>

<script>
  import ProjectLogo from "./components/ProjectLogo.vue"
  import TweenedNumber from "./components/TweenedNumber.vue"
  import TeamsList from "./components/TeamsList.vue"
  import DonationAlert from "./components/DonationAlert.vue"

  const UPDATE_INTERVAL = 60 * 1000

  export default {
    name: "App",
    components: { DonationAlert, TeamsList, TweenedNumber, ProjectLogo },
    data: () => ({
      data: null,
      showDonationAlert: false
    }),
    computed: {
      viewers: vm => vm.data === null ? 0 : vm.data.totalViewers
    },
    async created() {
      await this.loop()
      if (this.data.totalViewers > 1000) this.showDonationAlert = true
    },
    methods: {
      async loop() {
        await this.fetchTeams()
        setTimeout(() => {
          this.loop()
        }, UPDATE_INTERVAL)
      },
      async fetchTeams() {
        this.data = process.env.NODE_ENV === "development"
          ? await import("./assets/fake-data").then(m => m.getFakeData())
          : await (await fetch("/.netlify/functions/teams")).json()
      }
    }
  }
</script>
