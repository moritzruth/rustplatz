<template>
  <header class="pt-10 px-8">
    <ProjectLogo/>
    <div class="text-2xl text-center mt-5 md:mt-10">
      Rust-Streamerserver von Bonjwa, RocketBeans und Dhalucard
    </div>
    <div class="text-center mt-4 text-base">
      <p>Seite von <a href="https://twitter.com/moritz_ruth" class="text-blue-400">@moritz_ruth</a>.</p>
      <p>Schreibe mir gerne eine Twitter-Nachricht, wenn du ein Anliegen hast.</p>
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
        <li>Der Server ist täglich von 18 Uhr bis 1 Uhr (morgens) online (Ab 14.2.: 19 Uhr bis 1 Uhr).</li>
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
      <div v-else>
        <TeamsList :teams="data.teams"/>
      </div>
      <p class="mt-5 max-w-7xl w-full mx-auto">
        Die Liste aktualisiert sich automatisch. In den ersten paar Tagen kann es sein, dass noch Teilnehmer auf der
        Liste fehlen!
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
  <SeasonBreakOverlay :date="nextSeasonDate"/>
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
  import SeasonBreakOverlay from "./components/SeasonBreakOverlay.vue"
  import { nextSeasonDate as staticNextSeasonDate } from "./assets/static-data.json"

  const UPDATE_INTERVAL = 60 * 1000

  export default {
    name: "App",
    components: {
      SeasonBreakOverlay, EventsList, NumberBox, DonationAlert, TeamsList, TweenedNumber, ProjectLogo, InfoIcon
    },
    data: () => ({
      data: null,
      showDonationAlert: false,
      nextSeasonDateString: staticNextSeasonDate
    }),
    computed: {
      nextSeasonDate: vm => vm.nextSeasonDateString === null ? null : new Date(vm.nextSeasonDateString),
      viewers: vm => vm.data === null ? 0 : vm.data.totalViewers,
      totalPlayersCount: vm => vm.data === null
        ? 0
        : vm.data.teams.flatMap(team => [...team.online, ...team.offline]).length,
      onlinePlayersCount: vm => vm.data === null ? 0 : vm.data.teams.flatMap(team => team.online).length,
      showInGameNames: () => store.showInGameNames
    },
    watch: {
      nextSeasonDate: {
        immediate: true,
        handler() {
          document.body.classList.toggle("overflow-y-hidden", this.nextSeasonDate !== null)
        }
      }
    },
    async created() {
      await this.loop()
      this.showDonationAlert = true
      console.log(`Fetch interval: ${UPDATE_INTERVAL}`)
    },
    methods: {
      toggleNames() {
        store.showInGameNames = !store.showInGameNames
        this.umami(store.showInGameNames, "showInGameNames")
      },
      async loop() {
        await this.fetchData()
        setTimeout(() => {
          this.loop()
        }, UPDATE_INTERVAL)
      },
      async fetchData() {
        const fetchLive = async () => {
          console.log("Fetching live data...")
          this.data = process.env.NODE_ENV === "development"
            ? await import("./assets/fake-data").then(m => m.getFakeData())
            : await (await fetch("/.netlify/functions/data")).json()

          this.nextSeasonDateString = this.data.nextSeasonDate
        }

        const setEmptyData = () => {
          console.log("Setting data to empty...")

          this.data = {
            teams: [],
            totalViewers: 0
          }
        }

        const setOfflineData = async () => {
          console.log("Fetching/Using offline data...")
          const data = await import("../data.json")

          this.data = {
            teams: data.teams.map(team => ({
              name: team.name,
              online: [],
              offline: team.members
            })),
            totalViewers: 0
          }
        }

        if (this.nextSeasonDate === null) {
          const hour = new Date().getHours()

          if (hour >= 18 || hour < 2) await fetchLive()
          else await setOfflineData()
        } else if (this.nextSeasonDate.getTime() <= Date.now()) await fetchLive()
        else setEmptyData()
      }
    }
  }
</script>
