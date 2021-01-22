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
        <br>
        <strong>
          Bitte sendet mir keine Anfragen, ob ihr mitspielen dürft. Das kann ich sowieso nicht entscheiden!
        </strong>
      </p>
    </div>
  </header>
  <main class="p-5 text-lg space-y-8">
    <section class="flex flex-col justify-center items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
      <NumberBox title="Zuschauer" :show="viewers > 1000" class="w-72">
        <TweenedNumber :value="viewers"/>
      </NumberBox>
      <NumberBox title="Online" :show="onlinePlayersCount > 0" class="w-64">
        <TweenedNumber :value="onlinePlayersCount"/>/<TweenedNumber :value="totalPlayersCount"/>
      </NumberBox>
    </section>
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
    <div v-if="showPossibleIssueInfo" class="max-w-7xl w-full mx-auto text-2xl text-red-500 text-center">
      Es sieht so aus, als hätte der Rust-Server gerade Probleme.<br>
      Normalerweise erledigt sich das innerhalb weniger Minuten von alleine.
    </div>
    <section>
      <div class="max-w-7xl w-full mx-auto">
        <h1 class="heading">
          {{ data === null ? "" : data.teams.length - 2 }} Teams
          <span v-if="data !== null" class="text-lg font-normal">({{ totalPlayersCount }} Spieler)</span>
        </h1>
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
    </section>
  </main>
  <footer class="flex flex-col text-center px-4 py-2">
    <span>Inoffizielle Seite, erstellt von <a href="https://twitter.com/moritz_ruth">Moritz Ruth</a>.</span>
    <a href="https://github.com/moritzruth/rustplatz">Source Code</a>
  </footer>
  <DonationAlert v-model="showDonationAlert"/>
</template>

<style>
  ::selection {
    background: rgba(242, 92, 120, 0.7);
  }

  body {
    @apply bg-gray-900 text-gray-200 overflow-x-hidden;
  }

  a {
    @apply text-green-400;
  }

  .heading {
    @apply text-3xl md:text-5xl font-bold mb-5;
  }
</style>

<script>
  import ProjectLogo from "./components/ProjectLogo.vue"
  import TweenedNumber from "./components/TweenedNumber.vue"
  import TeamsList from "./components/TeamsList.vue"
  import DonationAlert from "./components/DonationAlert.vue"
  import NumberBox from "./components/NumberBox.vue"

  const UPDATE_INTERVAL = 60 * 1000

  export default {
    name: "App",
    components: { NumberBox, DonationAlert, TeamsList, TweenedNumber, ProjectLogo },
    data: () => ({
      data: null,
      showDonationAlert: false,
      showPossibleIssueInfo: false
    }),
    computed: {
      viewers: vm => vm.data === null ? 0 : vm.data.totalViewers,
      totalPlayersCount: vm => vm.data === null
        ? 0
        : vm.data.teams.flatMap(team => [...team.online, ...team.offline]).length,
      onlinePlayersCount: vm => vm.data === null ? 0 : vm.data.teams.flatMap(team => team.online).length
    },
    async created() {
      await this.loop()
      this.showDonationAlert = true
    },
    methods: {
      async loop() {
        await this.fetchTeams()
        setTimeout(() => {
          this.loop()
        }, UPDATE_INTERVAL)
      },
      async fetchTeams() {
        const hour = new Date().getHours()

        if (hour >= 15 || hour < 3) {
          this.data = process.env.NODE_ENV === "development"
            ? await import("./assets/fake-data").then(m => m.getFakeData())
            : await (await fetch("/.netlify/functions/teams")).json()

          // There seems to be an issue
          this.showPossibleIssueInfo = this.data.totalViewers === 0
        } else {
          this.data = {
            teams: (await import("../teams.json")).default.map(team => ({
              name: team.name,
              online: [],
              offline: team.members
            })),
            totalViewers: 0
          }

          this.showPossibleIssueInfo = false
        }
      }
    }
  }
</script>
