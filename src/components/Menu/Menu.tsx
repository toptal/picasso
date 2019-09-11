import React, {
  HTMLAttributes,
  forwardRef,
  ReactElement,
  useState,
  ReactNode
} from 'react'
import MUIMenuList, { MenuListProps } from '@material-ui/core/MenuList'
import { withStyles } from '@material-ui/core/styles'

import Container from '../Container'
import { Chevron16, BackMinor16 } from '../Icon'
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

interface StaticProps {
  Item: typeof MenuItem
}

function extendMenuItemsWithChevrons(
  children: ReactNode,
  onClick: (arg: number) => void
) {
  return React.Children.toArray(children).map((child, idx) => {
    const childElement = child as ReactElement

    if (childElement.props.menu) {
      child = (
        /* eslint-disable react/jsx-props-no-spreading */
        <MenuItem {...childElement.props} onClick={() => onClick(idx)}>
          <Container inline flex alignItems='center' style={{ flex: 1 }}>
            <Container style={{ flex: 1 }}>
              <WrappedStringMenuItemContent>
                {childElement.props.children}
              </WrappedStringMenuItemContent>
            </Container>
            <Chevron16 />
          </Container>
        </MenuItem>
        /* eslint-enable react/jsx-props-no-spreading */
      )
    }

    return child
  })
}

function getActiveChildRecursively(
  children: ReactNode,
  activeChildPath: number[]
): ReactElement {
  const currentLevelActiveChild = React.Children.toArray(children)[
    activeChildPath[0]
  ] as ReactElement

  if (activeChildPath.length === 1) {
    return currentLevelActiveChild
  } else {
    return getActiveChildRecursively(
      currentLevelActiveChild.props.menu.props.children,
      activeChildPath.slice(1)
    )
  }
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
      <MenuItem onClick={handleBack}>
        <Container inline flex alignItems='center' style={{ flex: 1 }}>
          <BackMinor16 />
          <Container style={{ flex: 1 }}>
            <WrappedStringMenuItemContent>Back</WrappedStringMenuItemContent>
          </Container>
        </Container>
      </MenuItem>
    )
    /* eslint-disable react/jsx-key */

    activeMenuProps = activeChild.props.menu.props
    children = [
      backButton,
      ...extendMenuItemsWithChevrons(
        activeChild.props.menu.props.children,
        handleDrilldown
      )
    ]
  } else {
    children = extendMenuItemsWithChevrons(children, handleDrilldown)
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
