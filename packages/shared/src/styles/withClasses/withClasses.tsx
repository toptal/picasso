import React, { ComponentType, ReactNode } from 'react'

import { Classes } from '../types'

type ConfigItem = {
  componentType?: ComponentType
  classes?: Classes
  childrenClasses?: Classes
}
type Config = (classes: Classes, childrenClasses?: Classes) => ConfigItem[]

export interface WithClassesProps {
  classes: Classes
  children: ReactNode
  childrenClasses?: Classes
}

const injectClassesToReactNode = (
  childNode: ReactNode,
  configItem: ConfigItem
) => {
  // eslint-disable-line complexity
  if (!React.isValidElement(childNode)) {
    return childNode
  }

  const { componentType, classes, childrenClasses } = configItem
  const isMatchingChild = !componentType || childNode.type === componentType

  if (!isMatchingChild) return childNode

  if (classes && childrenClasses) {
    return React.cloneElement(childNode, { classes, childrenClasses })
  }

  if (classes) {
    return React.cloneElement(childNode, { classes })
  }

  if (childrenClasses) {
    return React.cloneElement(childNode, { childrenClasses })
  }

  return childNode
}

// Modifies children react nodes by injecting additional `classes` or `childrenClasses` props
// based on the provided configuration object.
// Iterates over children and injects classes if they match the configuration.
export default (config: Config) => {
  const withClasses = <T extends WithClassesProps>(
    Component: ComponentType<T>
  ) => {
    const Wrapper = (props: T) => {
      const { children, classes, childrenClasses } = props

      const configItems = config(classes, childrenClasses)
      const childNodeWithClasses = (childNode: ReactNode) =>
        configItems.reduce(injectClassesToReactNode, childNode)
      const modifiedChildren = React.Children.map(
        children,
        childNodeWithClasses
      )

      return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Component {...props}>
          {modifiedChildren.length === 1
            ? modifiedChildren[0]
            : modifiedChildren}
        </Component>
      )
    }

    Wrapper.displayName = Component.displayName || Component.name

    return Wrapper
  }

  return withClasses
}
