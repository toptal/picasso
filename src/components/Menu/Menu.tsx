import React, {
  HTMLAttributes,
  forwardRef,
  ReactElement,
  useState
} from 'react'
import MUIMenuList, { MenuListProps } from '@material-ui/core/MenuList'
import { withStyles } from '@material-ui/core/styles'

import Container from '../Container'
import { Chevron16 } from '../Icon'
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

// eslint-disable-next-line react/display-name
export const Menu = forwardRef<HTMLUListElement, Props>(function Menu(
  { children, className, classes, style, ...rest },
  ref
) {
  const [activeChildIdx, setActiveChildIdx] = useState(-1)

  if (activeChildIdx !== -1) {
    const activeChild = React.Children.toArray(children).find((child, idx) => {
      return idx === activeChildIdx
    }) as ReactElement

    children = activeChild.props.menu
  } else {
    children = React.Children.toArray(children).map((child, idx) => {
      const childElement = child as ReactElement

      if (childElement.props.menu) {
        child = (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <MenuItem
            {...childElement.props}
            onClick={() => setActiveChildIdx(idx)}
          >
            <Container inline flex alignItems='center' style={{ flex: 1 }}>
              <Container style={{ flex: 1 }}>
                <WrappedStringMenuItemContent>
                  {childElement.props.children}
                </WrappedStringMenuItemContent>
              </Container>
              <Chevron16 />
            </Container>
          </MenuItem>
        )
      }

      return child
    })
  }

  return (
    <MUIMenuList
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      className={className}
      style={style}
      classes={classes}
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
