import React, { FunctionComponent, forwardRef } from 'react'
import {
  useAppConfig,
  ComponentNameToOverrideProps
} from '@toptal/picasso-shared'
import hoistNonReactStatics from 'hoist-non-react-statics'

type KeyValue = { [key: string]: unknown }

const withGlobalProps = <ComponentProps extends {}>(
  Component: FunctionComponent<ComponentProps>
) => {
  const WrapperComponent = forwardRef<HTMLElement, ComponentProps>(function (
    props: KeyValue,
    ref
  ) {
    const { defaultProps = {} } = useAppConfig()
    if (!Component.displayName) {
      throw new Error('Unable to get the displayName of the component')
    }

    const modifiableProps: KeyValue = {}
    Object.keys(props).forEach(key => {
      if (props[key] !== undefined) {
        modifiableProps[key] = props[key]
      }
    })

    const forwardedProps = {
      ...defaultProps[
        Component.displayName as keyof ComponentNameToOverrideProps
      ],
      ...modifiableProps
    }

    return <Component {...(forwardedProps as ComponentProps)} ref={ref} /> // eslint-disable-line react/jsx-props-no-spreading
  })

  WrapperComponent.displayName = Component.displayName

  return hoistNonReactStatics(WrapperComponent, Component)
}

export default withGlobalProps
