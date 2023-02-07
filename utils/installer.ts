import type { App, DefineComponent } from "vue"

const installer = (cpn: DefineComponent<{}, {}, any>) => {
  cpn.install = (app: App) => {
    app.component(cpn.name, cpn)
  }
  return cpn
}

export default installer
