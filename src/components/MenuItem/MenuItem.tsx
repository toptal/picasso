import React, {
  forwardRef,
  ReactNode,
  LiHTMLAttributes,
  HTMLAttributes,
  ElementType,
  ReactElement
} from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MUIMenuItem, { MenuItemProps } from '@material-ui/core/MenuItem'

import { StandardProps, ButtonOrAnchorProps } from '../Picasso'
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

// eslint-disable-next-line react/display-name
export const WrappedStringMenuItemContent = withStyles(styles)(
  forwardRef<HTMLElement, Props>(function WrappedStringMenuItemContent(
    { style, classes, children },
    ref
  ) {
    const { stringContent } = classes

    return (
      <Typography
        className={stringContent}
        style={style}
        color='inherit'
        ref={ref}
      >
        {children}
      </Typography>
    )
  })
)

export const MenuItem = forwardRef<HTMLElement, Props>(function MenuItem(
  {
    as,
    children,
    classes,
    className,
    disabled,
    disableGutters,
    onClick,
    selected,
    style,
    value,
    variant,
    ...rest
  },
  ref
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { stringContent, light, dark, ...restClasses } = classes

  if (typeof children === 'string') {
    children = (
      <WrappedStringMenuItemContent>{children}</WrappedStringMenuItemContent>
    )
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
      onClick={onClick}
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
