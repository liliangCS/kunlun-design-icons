import type { DefineComponent, App } from "vue"

type DefaultCpnType = DefineComponent<
  {},
  {},
  {},
  import("vue").ComputedOptions,
  import("vue").MethodOptions,
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  {},
  string,
  import("vue").VNodeProps &
    import("vue").AllowedComponentProps &
    import("vue").ComponentCustomProps,
  Readonly<import("vue").ExtractPropTypes<{}>>,
  {}
>

interface KlIconCpnType extends DefaultCpnType {
  install: (app: App<any>) => void
}

export default KlIconCpnType
