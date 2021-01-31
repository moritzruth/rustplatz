<template>
  <header class="pt-10 px-8">
    <ProjectLogo/>
    <div class="text-2xl text-center mt-5 md:mt-10">
      Rust-Streamerserver von Bonjwa, RocketBeans und Dhalucard
    </div>
    <div class="text-center mt-4 text-base">
      <p>Seite von <a href="https://twitter.com/moritz_ruth" class="text-blue-400">@moritz_ruth</a>.</p>
      <p>Schreibe mir gerne eine Twitter-Nachricht, wenn du ein Anliegen hast.</p>
      <p>Bitte sendet mir keine Anfragen, ob ihr mitspielen dürft. Das kann ich sowieso nicht entscheiden!</p>
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
        <li>Der Server ist täglich von 15 Uhr bis 3 Uhr (morgens) online. (Nach dem Wipe: 19 Uhr bis 1 Uhr)</li>
        <li>Andere Spieler zu töten ist nur mit Role-Play erlaubt, <b>außer</b> in den sog. KOS-Zonen.</li>
        <li>Um mitspielen zu können, muss ein Streamer von einem der Teilnehmer eingeladen werden.</li>
        <li>Es gibt keinen Global Text-Chat, dafür Team Text-Chat und In-Game Voice-Chat.</li>
        <li>Teams umfassen maximal 6 Personen.</li>
      </ul>
    </section>
    <section class="max-w-7xl w-full mx-auto">
      <h1 class="heading">Ereignisse</h1>
      <EventsList/>
    </section>
    <div v-if="showPossibleIssueInfo" class="max-w-7xl w-full mx-auto text-2xl text-red-500 text-center">
      Es sieht so aus, als hätte der Rust-Server gerade Probleme.<br>
      Normalerweise erledigt sich das innerhalb weniger Minuten von alleine.
    </div>
    <section>
      <div class="max-w-7xl w-full mx-auto pb-4">
        <h1 class="heading">
          {{ data === null ? "" : data.teams.length - 2 }} Teams
          <span v-if="data !== null" class="text-lg font-normal">({{ totalPlayersCount }} Spieler)</span>
        </h1>
        <p class="cannot-hover:hidden">
          Berühre
          <InfoIcon class="inline mx-1" stroke-width="3" size="1.04x"/>
          mit der Maus, um mehr Informationen zu einem Spieler anzuzeigen.
        </p>
        <p class="can-hover:hidden">
          Tippe auf
          <InfoIcon class="inline mx-1" stroke-width="3" size="1x"/>, um mehr Informationen zu einem Spieler anzuzeigen.
        </p>
        <button
          class="mt-3 py-1 px-2 rounded-sm text-black transition duration-200 w-72"
          :class="showInGameNames ? 'bg-yellow-400' : 'bg-yellow-200'"
          @click="toggleNames()"
        >
          {{ showInGameNames ? "Normale Namen anzeigen" : "In-Game-Namen anzeigen" }}
        </button>
      </div>
      <div v-if="data === null" class="text-2xl max-w-7xl w-full mx-auto">
        Lädt...
      </div>
      <div v-else class="md:p-2">
        <TeamsList :teams="data.teams"/>
      </div>
      <p class="mt-5 max-w-7xl w-full mx-auto">
        Die Liste aktualisiert sich automatisch. Spieler werden entfernt, wenn sie in den letzten 7 Tagen gestreamt
        haben, jedoch kein Rust-Stream darunter war. Allerdings gibt es Ausnahmen.
        Nach dem Wipe wird das anders sein und auch Spieler, die nicht streamen, bleiben auf der Liste.
      </p>
    </section>
    <section class="text-lg max-w-7xl w-full mx-auto">
      <p>
        Diese Seite kostet mich monatlich ca. 20€. Über
        <a href="http://m0.is/donate" class="text-blue-400">eine kleine Spende</a>
        würde ich mich deshalb sehr freuen.
      </p>
    </section>
  </main>
  <footer
    class="flex items-center justify-center flex-col space-y-3 py-8 mt-8 border-t border-blue-400 text-blue-400 text-xl
           sm:flex-row sm:space-x-8 sm:space-y-0"
  >
    <a href="https://twitter.com/moritz_ruth">@moritz_ruth</a>
    <a href="https://github.com/moritzruth/rustplatz">GitHub</a>
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

  .heading {
    @apply text-3xl md:text-5xl font-bold mb-5;
  }
</style>

<script>
  import { InfoIcon } from "@zhuowenli/vue-feather-icons"
  import ProjectLogo from "./components/ProjectLogo.vue"
  import TweenedNumber from "./components/TweenedNumber.vue"
  import TeamsList from "./components/TeamsList.vue"
  import DonationAlert from "./components/DonationAlert.vue"
  import NumberBox from "./components/NumberBox.vue"
  import EventsList from "./components/EventsList.vue"
  import { store } from "./assets/globals.js"

  const UPDATE_INTERVAL = 60 * 1000

  export default {
    name: "App",
    components: { EventsList, NumberBox, DonationAlert, TeamsList, TweenedNumber, ProjectLogo, InfoIcon },
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
      onlinePlayersCount: vm => vm.data === null ? 0 : vm.data.teams.flatMap(team => team.online).length,
      showInGameNames: () => store.showInGameNames
    },
    async created() {
      await this.loop()
      this.showDonationAlert = true
    },
    methods: {
      toggleNames() {
        store.showInGameNames = !store.showInGameNames
        this.umami(store.showInGameNames, "showInGameNames")
      },
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
