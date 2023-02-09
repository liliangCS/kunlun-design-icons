import { createApp } from "vue"
import App from "./App.vue"

import * as KlIconCpns from "@kl-design/icons"
import "@kl-design/icons/style.css"
import aa from "@kl-design/icons/icons.json"
console.log(aa)

const app = createApp(App)
for (const [key, component] of Object.entries(KlIconCpns)) {
  app.component(key, component)
}
app.mount("#app")
