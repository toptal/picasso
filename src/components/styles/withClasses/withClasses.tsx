import React, { ReactElement, ComponentType } from 'react'

import { Classes } from '../types'

type ReactComponent = ReactElement<any>

type ConfigItem = [ComponentType, string]

type Config = (classes: Classes) => ConfigItem[]

const addClass = (Component: ReactComponent, className: string) => {
  return React.cloneElement(Component, { className })
}

export default (config: Config) => {
  return <P extends object>(Component: ComponentType<P>) => {
    const withClasses = (props: any) => {
      const { children, classes } = props

      const modifiedChildren = React.Children.map(children, childNode => {
        let childResult = childNode

        config(classes).forEach(([ComponentType, className]) => {
          if (childNode.type === ComponentType) {
            childResult = addClass(childNode, className)
          }
        })

        return childResult
      })

      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Component {...props}>{modifiedChildren}</Component>
    }

    withClasses.displayName = Component.displayName || Component.name

    return withClasses
  }
}
