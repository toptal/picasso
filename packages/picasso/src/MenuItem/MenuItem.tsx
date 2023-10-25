import type {
  ReactNode,
  LiHTMLAttributes,
  HTMLAttributes,
  ElementType,
  ReactElement,
} from 'react'
import React, { forwardRef, useRef } from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import { MenuItem as MUIMenuItem } from '@material-ui/core'
import type {
  BaseProps,
  ButtonOrAnchorProps,
  TextLabelProps,
  OverridableComponent,
} from '@toptal/picasso-shared'
import { useTitleCase } from '@toptal/picasso-shared'

import Container from '../Container'
import {
  SPACING_2,
  SPACING_6,
  SPACING_1,
  ClickAwayListener,
  toTitleCase,
} from '../utils'
import { ChevronMinor16, CheckMinor16 } from '../Icon'
import Paper from '../Paper'
import Popper from '../Popper'
import Link from '../Link'
import { useMenuItem } from './hooks'
import styles from './styles'
import type { AvatarProps } from '../Avatar'
import type Avatar from '../Avatar'

export type VariantType = 'light' | 'dark'

export type MenuItemAttributes = LiHTMLAttributes<HTMLLIElement> &
  HTMLAttributes<HTMLDivElement> &
  ButtonOrAnchorProps

export interface Props extends BaseProps, TextLabelProps, MenuItemAttributes {
  /** Component name to render the item as */
  as?: ElementType
  /** Whether to render disabled item */
  disabled?: boolean
  /** Whether to render without internal padding */
  disableGutters?: boolean
  /** Adds an arrow to the item */
  menu?: ReactElement
  /** Highlights the item as selected */
  selected?: boolean
  /** Checkmarks the item */
  checkmarked?: boolean
  /** Value of the item */
  value?: string | Readonly<string[]> | number
  /** Variant of colors */
  variant?: VariantType
  /** Disables changing colors on hover/focus */
  nonSelectable?: boolean
  /** The main content of the item */
  children?: ReactNode
  /** The additional description */
  description?: ReactNode
  /** Render an `<Icon />` */
  icon?: ReactElement
  /** Render an <Avatar /> */
  avatar?: ReactElement<AvatarProps, typeof Avatar>
  /** Callback when item is clicked */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  /** Callback when item is hovered */
  onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoMenuItem',
})

export const MenuItem: OverridableComponent<Props> = forwardRef<
  HTMLElement,
  Props
  // eslint-disable-next-line complexity
>(function MenuItem(props, ref) {
  const {
    as = 'li',
    children,
    description,
    className,
    disabled,
    disableGutters,
    menu,
    titleCase: propTitleCase,
    selected,
    checkmarked,
    style,
    value,
    variant = 'light',
    nonSelectable,
    onClick,
    onMouseEnter,
    icon,
    avatar,
    ...rest
  } = props

  const classes = useStyles()
  const anchorRef = useRef<HTMLDivElement>(null)
  const titleCase = useTitleCase(propTitleCase)
  const { isOpened, onItemClick, onItemMouseEnter, onAwayClick } = useMenuItem({
    menu,
    onClick,
    onMouseEnter,
  })
  const isLink = as === Link && rest.href
  const isIconWrapperVisible = checkmarked !== undefined || icon

  return (
    <>
      <MUIMenuItem
        {...rest}
        ref={ref}
        // replace Picasso Link with Anchor to not applying Picasso
        // Link component styles, this is the only difference between them now
        component={isLink ? 'a' : as}
        classes={{
          gutters: classes.gutters,
          selected: classes.selected,
        }}
        className={cx(classes.root, classes[variant], className, {
          [classes.nonSelectable]: nonSelectable,
          [classes.disabled]: disabled,
        })}
        disabled={disabled}
        disableGutters={disableGutters}
        onClick={onItemClick}
        onMouseEnter={onItemMouseEnter}
        style={style}
        value={value}
        selected={selected || isOpened}
      >
        <Container
          ref={anchorRef}
          className={classes.itemWrapper}
          flex
          direction='row'
        >
          {avatar && <Container right={SPACING_2}>{avatar}</Container>}

          <Container flex direction='column' className={classes.content}>
            <Container flex alignItems='center'>
              {isIconWrapperVisible && (
                <Container
                  className={classes.iconContainer}
                  flex
                  inline
                  right={SPACING_2}
                >
                  {checkmarked ? <CheckMinor16 /> : icon}
                </Container>
              )}
              {typeof children === 'string' ? (
                <span
                  className={cx(classes.stringContent, {
                    [classes.stringContentSemibold]: checkmarked,
                  })}
                  style={style}
                >
                  {titleCase ? toTitleCase(children) : children}
                </span>
              ) : (
                children
              )}
              {menu && (
                <Container flex inline left={SPACING_2}>
                  <ChevronMinor16 color='' />
                </Container>
              )}
            </Container>
            {description && (
              <Container
                className={cx(classes.description, {
                  [classes.descriptionDisabled]: disabled,
                })}
                left={isIconWrapperVisible ? SPACING_6 : undefined}
                top={SPACING_1}
              >
                {description}
              </Container>
            )}
          </Container>
        </Container>
      </MUIMenuItem>
      {menu && isOpened && (
        <Popper
          anchorEl={anchorRef.current}
          placement='right-start'
          open
          autoWidth={false}
          enableCompactMode
          popperOptions={{
            modifiers: {
              offset: {
                offset: `-10px,6px`,
              },
            },
          }}
        >
          <ClickAwayListener onClickAway={onAwayClick}>
            <Paper className={classes.paper}>{menu}</Paper>
          </ClickAwayListener>
        </Popper>
      )}
    </>
  )
})

MenuItem.defaultProps = {
  as: 'li',
  variant: 'light',
  nonSelectable: false,
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
