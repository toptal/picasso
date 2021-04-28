import React, { ReactNode } from 'react'

import { Classes } from './types'

type ConfigItem<T> = [T, Classes]
type Config<T> = (classes: Classes) => ConfigItem<T>[]

export interface Arguments<T> {
  classes: Classes
  children: ReactNode
  config: Config<T>
}

const addClassesToChildren = <T extends unknown>({
  classes,
  children,
  config
}: Arguments<T>) => {
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

export default addClassesToChildren
