import React, { ElementType, ReactNode } from 'react'

import { Classes } from './types'

type ConfigItem = [ElementType, Classes]
type Config = (classes: Classes) => ConfigItem[]

export interface Arguments {
  classes: Classes
  children: ReactNode
  config: Config
}

const addClassesToChildren = ({ classes, children, config }: Arguments) => {
  return React.Children.map(children, childNode => {
    if (!React.isValidElement(childNode)) {
      return childNode
    }

    let childResult = childNode

    config(classes).forEach(([elementType, configClasses]) => {
      if (childNode.type === elementType) {
        childResult = React.cloneElement(childNode, {
          classes: configClasses
        })
      }
    })

    return childResult
  })
}

export default addClassesToChildren
