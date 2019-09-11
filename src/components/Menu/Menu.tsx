import React, {
  HTMLAttributes,
  forwardRef,
  ReactElement,
  useState,
  ReactNode
} from 'react'
import MUIMenuList, { MenuListProps } from '@material-ui/core/MenuList'
import { withStyles } from '@material-ui/core/styles'

import { BackMinor16 } from '../Icon'
import MenuItem, { WrappedStringMenuItemContent } from '../MenuItem'
import {
  StandardProps,
  PicassoComponentWithRef,
  CompoundedComponentWithRef
} from '../Picasso'
import styles from './styles'

export type ListNativeProps = HTMLAttributes<HTMLUListElement> &
  Pick<MenuListProps, 'onKeyDown'>

export interface Props extends StandardProps, ListNativeProps {}

export interface StaticProps {
  Item: typeof MenuItem
}

function extendMenuItemsWithNavigation(
  children: ReactNode,
  onClick: (arg: number) => void,
  activeChildPath: number[]
) {
  return React.Children.toArray(children).map((child, index) => {
    const childElement = child as ReactElement

    let props = childElement.props

    if (childElement.props.menu) {
      props = {
        ...props,
        onClick: () => onClick(index)
      }
    }

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading, react/no-array-index-key
      <MenuItem {...props} key={activeChildPath.join('_') + index}>
        {childElement.props.children}
      </MenuItem>
    )
  })
}

function getActiveChildRecursively(
  children: ReactNode,
  activeChildPath: number[]
): ReactElement {
  const currentLevelActiveChild = React.Children.toArray(children)[
    activeChildPath[0]
  ] as ReactElement

  if (activeChildPath.length > 1) {
    return getActiveChildRecursively(
      currentLevelActiveChild.props.menu.props.children,
      activeChildPath.slice(1)
    )
  }
  return currentLevelActiveChild
}

// eslint-disable-next-line react/display-name
export const Menu = forwardRef<HTMLUListElement, Props>(function Menu(
  { children, className, classes, style, ...rest },
  ref
) {
  const [activeChildPath, setActiveChildPath] = useState<number[]>([])

  function handleDrilldown(innerIdx: number) {
    const newPath = [...activeChildPath, innerIdx]

    setActiveChildPath(newPath)
  }

  function handleBack() {
    setActiveChildPath(activeChildPath.slice(0, -1))
  }

  let activeMenuProps = {}

  if (activeChildPath.length) {
    const activeChild = getActiveChildRecursively(children, activeChildPath)

    /* eslint-disable react/jsx-key */
    const backButton = (
      <MenuItem onClick={handleBack} key={activeChildPath.join('_') + 'back'}>
        <BackMinor16 />
        <WrappedStringMenuItemContent>Back</WrappedStringMenuItemContent>
      </MenuItem>
    )
    /* eslint-disable react/jsx-key */

    activeMenuProps = activeChild.props.menu.props
    children = [
      backButton,
      ...extendMenuItemsWithNavigation(
        activeChild.props.menu.props.children,
        handleDrilldown,
        activeChildPath
      )
    ]
  } else {
    children = extendMenuItemsWithNavigation(
      children,
      handleDrilldown,
      activeChildPath
    )
  }

  return (
    <MUIMenuList
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      className={className}
      style={style}
      classes={classes}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...activeMenuProps}
    >
      {children}
    </MUIMenuList>
  )
}) as CompoundedComponentWithRef<Props, HTMLUListElement, StaticProps>

Menu.displayName = 'Menu'

Menu.Item = MenuItem

export default withStyles(styles)(Menu) as PicassoComponentWithRef<
  Props,
  HTMLUListElement,
  StaticProps
>
