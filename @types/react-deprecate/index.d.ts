import type React from 'react'

declare module 'react-deprecate' {
  export type ProvidedProps = {
    [key: string]: unknown
  }

  export type IsDeprecatedFn = (
    prop: string,
    providedProps: ProvidedProps
  ) => boolean

  export type DeprecatedProps = {
    [key: string]:
      | string
      | null
      | {
          mapTo: string | null
          isDeprecated?: IsDeprecatedFn
        }
  }

  export type WarningArgs = {
    componentName: string
    deprecatedProps: DeprecatedProps
    mapTo: string | null
    prop: string
    value: unknown
  }

  export type WarningFn = (args: WarningArgs) => string

  export default function renamePropsWithWarning<Props>(
    WrappedComponent: React.ComponentType<Props>,
    deprecatedProps?: DeprecatedProps,
    warningMessage?: WarningFn
  ): React.ComponentType<Props>
}
