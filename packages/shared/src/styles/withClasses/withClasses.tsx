import React, { ComponentType, ReactNode } from 'react'

import { Classes } from '../types'

type ConfigItem = [ComponentType, Classes]
type Config = (classes: Classes) => ConfigItem[]

export interface WithClassesProps {
  classes: Classes
  children: ReactNode
}

export default (config: Config) => {
  const withClasses = <T extends WithClassesProps>(
    Component: ComponentType<T>
  ) => {
    const Wrapper = (props: T) => {
      const { children, classes } = props

      const modifiedChildren = React.Children.map(children, childNode => {
        if (!React.isValidElement(childNode)) {
          return childNode
        }

        let childResult = childNode

        config(classes).forEach(([componentType, configClasses]) => {
          if (childNode.type === componentType) {
            childResult = React.cloneElement(childNode, {
              classes: configClasses
            })
          }
        })

        return childResult
      })

      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Component {...props}>{modifiedChildren}</Component>
    }

    Wrapper.displayName = Component.displayName || Component.name

    return Wrapper
  }

  return withClasses
}
