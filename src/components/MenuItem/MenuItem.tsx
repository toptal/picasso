import React, {
  forwardRef,
  ReactNode,
  LiHTMLAttributes,
  HTMLAttributes,
  ElementType,
  ReactElement,
  useContext
} from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MUIMenuItem, { MenuItemProps } from '@material-ui/core/MenuItem'

import Container from '../Container'
import { ChevronMinor16 } from '../Icon'
import { StandardProps, ButtonOrAnchorProps } from '../Picasso'
import { MenuContext } from '../Menu'
import { MenuContextProps } from '../Menu/types'
import Typography from '../Typography'
import styles from './styles'

export type VariantType = 'light' | 'dark'

export type MenuItemAttributes = LiHTMLAttributes<HTMLLIElement> &
  HTMLAttributes<HTMLDivElement> &
  ButtonOrAnchorProps

export interface Props extends StandardProps, MenuItemAttributes {
  /** Component name to render the menu item as */
  as?: ElementType<MenuItemProps>
  /** Whether to render disabled item */
  disabled?: boolean
  /** Whether to render without internal padding */
  disableGutters?: boolean
  children?: ReactNode
  /** Nested menu */
  menu?: ReactElement
  /** Callback when menu item is clicked */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  /** Highlights the item as selected */
  selected?: boolean
  /** Value of the item. Can be used when menu item is used inside Select component. */
  value?: string | string[] | number
  /** Variant of colors */
  variant?: VariantType
}

export const MenuItem = forwardRef<HTMLElement, Props>(function MenuItem(
  {
    as,
    children,
    classes,
    className,
    disabled,
    disableGutters,
    menu,
    onClick,
    selected,
    style,
    value,
    variant,
    ...rest
  },
  ref
) {
  const hasMenu = Boolean(menu)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { stringContent, light, dark, chevron, ...restClasses } = classes

  const { push } = useContext<MenuContextProps>(MenuContext)

  if (typeof children === 'string') {
    children = (
      <span className={stringContent} style={style}>
        {children}
      </span>
    )
  }

  if (hasMenu) {
    children = (
      <Container inline flex alignItems='center' style={{ flex: 1 }}>
        <Container style={{ flex: 1 }}>{children}</Container>
        <span className={classes.chevron}>
          <ChevronMinor16 />
        </span>
      </Container>
    )
  }

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (menu) {
      event.stopPropagation()
      push(menu)
    }

    if (onClick) {
      onClick(event)
    }
  }

  return (
    <MUIMenuItem
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      component={as!}
      classes={restClasses}
      className={cx(classes[variant!], className)}
      disabled={disabled}
      disableGutters={disableGutters}
      onClick={handleClick}
      style={style}
      value={value}
      selected={selected}
    >
      {children}
    </MUIMenuItem>
  )
})

MenuItem.defaultProps = {
  as: 'li',
  onClick: () => {},
  variant: 'light'
}

MenuItem.displayName = 'MenuItem'

export default withStyles(styles)(MenuItem)
