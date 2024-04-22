import type {
  ReactNode,
  LiHTMLAttributes,
  HTMLAttributes,
  ElementType,
  ReactElement,
} from 'react'
import React, { forwardRef, useRef } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import type {
  BaseProps,
  ButtonOrAnchorProps,
  TextLabelProps,
  OverridableComponent,
} from '@toptal/picasso-shared'
import { useTitleCase } from '@toptal/picasso-shared'
import { ChevronMinor16, CheckMinor16 } from '@toptal/picasso-icons'
import { Paper } from '@toptal/picasso-paper'
import { Popper } from '@toptal/picasso-popper'
import { Link } from '@toptal/picasso-link'
import { ClickAwayListener, toTitleCase } from '@toptal/picasso-utils'
import type { AvatarProps, Avatar } from '@toptal/picasso-avatar'

import { useMenuItem } from './hooks'

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

  const anchorRef = useRef<HTMLDivElement>(null)
  const titleCase = useTitleCase(propTitleCase)
  const { isOpened, onItemClick, onItemMouseEnter, onAwayClick } = useMenuItem({
    menu,
    onClick,
    onMouseEnter,
  })
  const isLink = as === Link && rest.href
  const Component: React.ElementType = isLink ? 'a' : as || 'li'

  const isIconWrapperVisible = checkmarked !== undefined || icon

  const variantStyles = {
    light: twJoin(
      'text-black hover:bg-blue-100 focus:bg-blue-100',
      (selected || isOpened) && 'bg-blue-100'
    ),
    dark: twJoin(
      'text-gray-500 hover:bg-graphite-700 focus:bg-graphite-700 focus:text-white',
      (selected || isOpened) && 'text-white bg-graphite-700'
    ),
  }

  // TODO aria

  return (
    <>
      <Component
        {...rest}
        ref={ref}
        // replace Picasso Link with Anchor to not applying Picasso
        // Link component styles, this is the only difference between them now
        component={isLink ? 'a' : as}
        className={twMerge(
          variantStyles[variant],
          disableGutters ? 'p-0' : 'px-4 py-[0.375rem]',
          nonSelectable && 'hover:bg-[unset] focus:bg-[unset]',
          disabled && 'opacity-100 pointer-events-none text-gray-600',
          'min-w-[9rem] w-auto min-h-[unset] md:min-h-0 relative cursor-pointer',
          'transition-colors duration-150 ease-in-out',
          'overflow-hidden whitespace-normal text-left no-underline',
          'flex items-center justify-start',
          'outline-none bg-[transparent] appearance-none',
          className
        )}
        disabled={disabled}
        onClick={onItemClick}
        onMouseEnter={onItemMouseEnter}
        style={style}
        value={value}
      >
        <div ref={anchorRef} className='flex flex-1 max-w-full'>
          {avatar && <div className='mr-2'>{avatar}</div>}

          <div className='flex flex-col flex-1 min-w-0'>
            <div className='flex items-center'>
              {isIconWrapperVisible && (
                <div className='w-4 inline-flex mr-2'>
                  {checkmarked ? <CheckMinor16 /> : icon}
                </div>
              )}
              {typeof children === 'string' ? (
                <span
                  className={twJoin(
                    'flex-1 text-md leading-5',
                    checkmarked && 'text-semibold'
                  )}
                  style={style}
                >
                  {titleCase ? toTitleCase(children) : children}
                </span>
              ) : (
                children
              )}
              {menu && (
                <div className='inline-flex ml-2'>
                  <ChevronMinor16 color='' />
                </div>
              )}
            </div>
            {description && (
              <div
                className={twJoin(
                  'text-2xs mt-1',
                  !disabled && 'text-graphite-700',
                  isIconWrapperVisible && 'ml-6'
                )}
              >
                {description}
              </div>
            )}
          </div>
        </div>
      </Component>
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
            <Paper className='max-h-[14.75rem] overflow-y-auto'>{menu}</Paper>
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
