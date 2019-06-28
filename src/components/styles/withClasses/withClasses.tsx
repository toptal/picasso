import React, { ReactElement, ComponentType } from 'react'

import { Classes } from '../types'

type ReactComponent = ReactElement<any>

type ConfigItem = [ComponentType, Classes]

type Config = (classes: Classes) => ConfigItem[]

const addClass = (Component: ReactComponent, classes: Classes) => {
  return React.cloneElement(Component, { classes })
}

export default (config: Config) => {
  return <P extends object>(Component: ComponentType<P>) => {
    const withClasses = (props: any) => {
      const { children, classes } = props

      const modifiedChildren = React.Children.map(children, childNode => {
        let childResult = childNode

        config(classes).forEach(([ComponentType, classes]) => {
          if (childNode.type === ComponentType) {
            childResult = addClass(childNode, classes)
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
