<template>
  <div
    class="season-end-overlay bg-black absolute top-0 left-0 w-screen flex items-center justify-center flex-col
           py-8 px-6 md:p-10"
    :class="show ? 'opacity-100' : 'opacity-0 pointer-events-none h-screen overflow-hidden'"
  >
    <div
      class="season-end-overlay__content max-w-2xl mx-auto text-lg md:text-xl md:leading-6 text-gray-200 space-y-10"
      :class="show ? 'opacity-100' : 'opacity-0'"
    >
      <section class="space-y-5">
        <p class="text-2xl leading-7">
          Rustplatz war ein Streamer-only Rust-Server von Bonjwa, Dhalucard und den RocketBeans.
        </p>
        <p>
          Season 1 startete am 16. Januar 2021 um 15 Uhr mit
          <span class="whitespace-nowrap text-green-300">ca. 50 Mitspielern</span>.
          Diese Zahl steigerte sich bis zum Ende der Season auf
          <span class="whitespace-nowrap text-green-300">über 90</span>.<br>
          In der Zeit bis zum 3.2. wurden viele großartige Charaktere geschaffen, Geschichten erzählt, Drogen gehandelt,
          Intrigen geplant, Pferde geklaut, Pferde gefunden, Talente dargeboten, Leute gerächt, Ehen geschlossen
          und Freundschaften geschaffen.<br>
          Die Season endete mit dem Untergang der Insel.
        </p>
        <p>
          Die zweite Season (mit einigen kleinen Regeländerungen) begann am 7.2. um 18 Uhr. Diesmal spielten von Anfang
          an ca. 120 Streamer mit.
          Der Fokus sollte nun noch stärker auf Role-Play gelegt werden, jedoch gab es auch einige PvE-Events, wie
          z. B. einen Zombie-Angriff auf einen Friedhof.<br>
          Zwischenzeitlich schauten über alle Streams hinweg
          <span class="whitespace-nowrap text-green-300">120.000 Zuschauer</span>
          gleichzeitig zu.<br>
          Season 2 endete am 3. März 2021.
        </p>
        <p>
          Ich denke, ich spreche für die gesamte Community, wenn ich mich für diese unvergessliche Zeit bedanke.<br>
          — <a href="https://twitter.com/moritz_ruth" class="text-yellow-300">Moritz Ruth</a>
        </p>
      </section>
      <section>
        <h1 class="font-bold text-2xl mb-2">Alle Mitspieler</h1>
        <p class="mb-3 text-base">
          Weist mich gerne auf Fehler hin.
        </p>
        <ul class="list-disc pl-4">
          <li v-for="name in participants" :key="name">
            {{ name }}
          </li>
        </ul>
      </section>
      <section>
        <h1 class="font-bold text-2xl mb-2">Weiteres</h1>
        <div class="space-y-5">
          <p>
            Ich hätte wirklich nie damit gerechnet, dass meine Seite so beliebt sein wird. Insgesamt hatte sie über
            300.000 Aufrufe bei jederzeit zwischen 10 und 50 Besuchern.
          </p>
          <p>
            Die am häufigsten (auf dieser Seite) angeklickten Kanäle sind Bonjwa mit 14.000 Klicks,
            Torro mit 10.000 Klicks und Dhalucard mit 8.000 Klicks. Insgesamt sind es eigentlich nochmal mehr, da ich
            diese Daten nicht von Anfang an erhoben habe.<br>
            Danach folgen CHIMPnSALMOn, JustGiggles, JenNyan, RocketBeansTV, LOST, SaeriFae und GThang.
          </p>
          <p>
            Die meisten Aufrufe kamen von Google, manche von rocketbeans.tv.
            Wie viele von twitch.tv kommen, kann man leider nicht analysieren. Das müssten aber auch einige sein, da
            viele Streamer die Seite regelmäßig von NightBot in den Chat posten ließen.
          </p>
          <p>
            Danke an
            <a href="https://github.com/toxic2302" class="text-yellow-300">toxic2302</a>,
            der auch einiges zur Liste beigetragen hat.
          </p>
        </div>
      </section>
      <section>
        <a href="https://github.com/moritzruth/rustplatz" class="text-blue-400">Source Code auf GitHub</a>
      </section>
    </div>
  </div>
</template>

<style scoped>
  .season-end-overlay {
    transition: opacity ease-in 8s;
  }

  .season-end-overlay__content {
    transition: opacity ease-in 10s;
    transition-delay: 10s;
  }
</style>

<script>
  import participants from "../assets/participants.json"

  export default {
    name: "SeasonEndOverlay",
    props: {
      show: Boolean
    },
    data: () => ({
      participants
    })
  }
</script>
