import "./assets/tailwind.css"
import "./assets/transitions.css"

import { createApp } from "vue"
import App from "./App.vue"

createApp(App)
  .mixin({
    methods: {
      umami: (...arguments_) => window.umami.trackEvent(...arguments_)
    }
  })
  .mount("#app")
