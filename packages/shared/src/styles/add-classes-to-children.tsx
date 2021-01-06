import React, { ComponentType, ReactNode } from 'react'

import { Classes } from './types'

type ConfigItem = [ComponentType, Classes]
type Config = (classes: Classes) => ConfigItem[]

export interface Arguments {
  classes: Classes
  children: ReactNode
  config: Config
}

export default ({ classes, children, config }: Arguments) => {
  return React.Children.map(children, childNode => {
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
}
