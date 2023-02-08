import { createApp } from "vue"
import App from "./App.vue"

import * as KlIconCpns from "@kl-design/icons"
import "@kl-design/icons/style.css"

const app = createApp(App)
for (const [key, component] of Object.entries(KlIconCpns)) {
  app.component(key, component)
}
app.mount("#app")
