import React, { ComponentType, ReactNode } from 'react'

import { Classes } from '../types'

type ConfigItem = [ComponentType, Classes]
type Config = (classes: Classes) => ConfigItem[]

export interface WithClassesProps {
  classes: Classes
  children: ReactNode
}

export default (config: Config) => {
  return <P extends object>(Component: ComponentType<P>) => {
    const WithClasses = (props: P & WithClassesProps) => {
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

    WithClasses.displayName = Component.displayName || Component.name

    return WithClasses
  }
}
