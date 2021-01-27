/* eslint-disable complexity */
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
import { Theme, makeStyles } from '@material-ui/core/styles'
import capitalize from '@material-ui/core/utils/capitalize'
import MUIMenuItem from '@material-ui/core/MenuItem'
import {
  BaseProps,
  ButtonOrAnchorProps,
  TextLabelProps,
  SizeType,
  useTitleCase,
  OverridableComponent
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

export interface Props extends BaseProps, TextLabelProps, MenuItemAttributes {
  /** Component name to render the menu item as */
  as?: ElementType
  /** Whether to render disabled item */
  disabled?: boolean
  /** Whether to render without internal padding */
  disableGutters?: boolean
  children?: ReactNode
  description?: ReactNode
  /** Nested menu */
  menu?: ReactElement
  /** Callback when menu item is clicked */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  /** Highlights the item as selected */
  selected?: boolean
  /** Checkmarks the item */
  checkmarked?: boolean
  /** Value of the item. Can be used when menu item is used inside Select component. */
  value?: string | Readonly<string[]> | number
  /** Variant of colors */
  variant?: VariantType
  /** Size of component */
  size?: SizeType<'small' | 'medium'>
  /** Disables changing colors on hover/focus */
  nonSelectable?: boolean
}

const generateKey = (() => {
  let count = 0

  return () => String(++count)
})()

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoMenuItem'
})

export const MenuItem: OverridableComponent<Props> = forwardRef<
  HTMLElement,
  Props
>(function MenuItem(props, ref) {
  const {
    as,
    children,
    description,
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
    nonSelectable,
    ...rest
  } = props
  const classes = useStyles()

  const { push, refresh } = useContext<MenuContextProps>(MenuContext)
  const key = useMemo(generateKey, [])

  const titleCase = useTitleCase(propsTitleCase)

  useEffect(() => {
    if (menu && refresh) {
      refresh(key, menu)
    }
  }, [key, menu, refresh])

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (menu && push) {
      event.stopPropagation()
      push(key, menu)
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
      classes={{
        root: cx({
          [classes[`gutters${size && capitalize(size!)}`]]: size
        }),
        selected: classes.selected
      }}
      className={cx(classes.root, classes[variant!], className, {
        [classes.nonSelectable]: nonSelectable
      })}
      disabled={disabled}
      disableGutters={disableGutters}
      onClick={handleClick}
      style={style}
      value={value}
      selected={selected}
    >
      <Container flex direction='column' className={classes.content}>
        <Container flex alignItems='center'>
          {checkmarked !== undefined && (
            <Container
              className={classes.iconContainer}
              flex
              inline
              right='xsmall'
            >
              {checkmarked && <CheckMinor16 />}
            </Container>
          )}
          {typeof children === 'string' ? (
            <span
              className={cx(classes.stringContent, {
                [classes[`stringContent${size && capitalize(size!)}`]]: size,
                [classes.stringContentSemibold]: checkmarked
              })}
              style={style}
            >
              {titleCase ? toTitleCase(children) : children}
            </span>
          ) : (
            children
          )}
          {menu && (
            <Container flex inline left='xsmall'>
              <ChevronMinor16 />
            </Container>
          )}
        </Container>
        {description && (
          <Container
            className={classes.description}
            left={checkmarked === undefined ? undefined : 'medium'}
            top={0.25}
          >
            {description}
          </Container>
        )}
      </Container>
    </MUIMenuItem>
  )
})

MenuItem.defaultProps = {
  as: 'li',
  onClick: () => {},
  variant: 'light',
  nonSelectable: false
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
