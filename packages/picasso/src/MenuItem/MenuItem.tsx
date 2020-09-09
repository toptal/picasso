import React, {
  forwardRef,
  ReactNode,
  LiHTMLAttributes,
  HTMLAttributes,
  ElementType,
  ReactElement,
  useContext,
  useEffect,
  useMemo
} from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import capitalize from '@material-ui/core/utils/capitalize'
import MUIMenuItem from '@material-ui/core/MenuItem'
import {
  StandardProps,
  ButtonOrAnchorProps,
  TextLabelProps,
  SizeType,
  useTitleCase
} from '@toptal/picasso-shared'

import { ChevronMinor16, CheckMinor16 } from '../Icon'
import Container from '../Container'
import MenuContext, { MenuContextProps } from '../Menu/menuContext'
import toTitleCase from '../utils/to-title-case'
import styles from './styles'

export type VariantType = 'light' | 'dark'

export type MenuItemAttributes = LiHTMLAttributes<HTMLLIElement> &
  HTMLAttributes<HTMLDivElement> &
  ButtonOrAnchorProps

export interface Props
  extends StandardProps,
    TextLabelProps,
    MenuItemAttributes {
  /** Component name to render the menu item as */
  as?: ElementType
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
  /** Checkmarks the item */
  checkmarked?: boolean
  /** Value of the item. Can be used when menu item is used inside Select component. */
  value?: string | string[] | number
  /** Variant of colors */
  variant?: VariantType
  /**
   * Size of component
   */
  size?: SizeType<'small' | 'medium'>
}

const generateKey = (() => {
  let count = 0

  return () => String(++count)
})()

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
    checkmarked,
    style,
    value,
    variant,
    size,
    titleCase: propsTitleCase,
    ...rest
  },
  ref
) {
  const { push, refresh } = useContext<MenuContextProps>(MenuContext)
  const key = useMemo(generateKey, [])

  const titleCase = useTitleCase(propsTitleCase)

  useEffect(() => {
    if (menu && refresh) {
      refresh(key, menu)
    }
  }, [key, menu, refresh])

  if (typeof children === 'string') {
    children = (
      <span
        className={cx(classes.stringContent, {
          [classes[`stringContent${size && capitalize(size!)}`]]: size
        })}
        style={style}
      >
        {titleCase ? toTitleCase(children) : children}
      </span>
    )
  }

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (menu && push) {
      event.stopPropagation()
      push(key, menu)
    }

    if (onClick) {
      onClick(event)
    }
  }

  const renderIconIfEligible = () => {
    if (menu) {
      return (
        <Container flex inline left='xsmall'>
          <ChevronMinor16 />
        </Container>
      )
    }
    if (checkmarked) {
      return (
        <Container flex inline left='xsmall' data-testid='select-checkmark'>
          <CheckMinor16 />
        </Container>
      )
    }
    return null
  }

  return (
    <MUIMenuItem
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      component={as!}
      classes={{
        root: cx({
          [classes[`gutters${size && capitalize(size!)}`]]: size
        }),
        selected: classes.selected
      }}
      className={cx(classes[variant!], className)}
      disabled={disabled}
      disableGutters={disableGutters}
      onClick={handleClick}
      style={style}
      value={value}
      selected={selected}
    >
      {children}
      {renderIconIfEligible()}
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
