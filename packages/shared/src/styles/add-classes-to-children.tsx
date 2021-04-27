import React, { ReactNode } from 'react'

import { Classes } from './types'

type ConfigType = unknown
type ConfigItem = [ConfigType, Classes]
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

    config(classes).forEach(([configType, configClasses]) => {
      if (childNode.type === configType) {
        childResult = React.cloneElement(childNode, {
          classes: configClasses
        })
      }
    })

    return childResult
  })
}
