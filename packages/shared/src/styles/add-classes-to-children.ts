import type { ElementType, ReactNode } from 'react'
import React from 'react'

import type { Classes } from './types'

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
          classes: configClasses,
        } as {})
      }
    })

    return childResult
  })
}

export default addClassesToChildren
