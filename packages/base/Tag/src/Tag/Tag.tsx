import type {
  ReactNode,
  ReactElement,
  ElementType,
  MouseEvent,
  AnchorHTMLAttributes,
  HTMLAttributes,
} from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps, TextLabelProps } from '@toptal/picasso-shared'
import { useTitleCase } from '@toptal/picasso-shared'
import { CloseMinor16 } from '@toptal/picasso-icons'
import { Typography } from '@toptal/picasso-typography'
import { twMerge } from 'tailwind-merge'

import { classByVariant } from './styles'

export type Variant = 'light-grey' | 'blue' | 'green' | 'yellow' | 'red'

export type DivOrAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  HTMLAttributes<HTMLDivElement>

export interface Props extends BaseProps, TextLabelProps, DivOrAnchorProps {
  /** The component used for the root node. Either a string to use a DOM element or a component. */
  as?: ElementType
  /** Text content of the `Tag` component */
  children: ReactNode
  /** Specify the icon which should be rendered inside Tag */
  icon?: ReactElement
  /** Defines if `Tag` is disabled */
  disabled?: boolean
  /** A callback which is invoked after remove `Icon` is clicked
   *
   * Please note that specifying this callback automatically adds remove `Icon` as children of the `Tag`
   */
  onDelete?: () => void
  /** Variant of the `Tag` */
  variant?: Variant
  /** ReactNode rendered after label */
  endAdornment?: ReactNode
}

export const Tag = forwardRef<HTMLDivElement, Props>(function Tag(props, ref) {
  const {
    as: Root = 'div',
    className,
    disabled,
    endAdornment,
    children,
    icon,
    onDelete,
    onClick,
    style,
    titleCase: propsTitleCase,
    variant = 'light-grey',
    role,
    ...rest
  } = props
  const titleCase = useTitleCase(propsTitleCase)

  const handleDelete = (event: MouseEvent) => {
    if (disabled) {
      return
    }

    if (onDelete) {
      event.preventDefault()

      /**
       * If the event propagates, the component interprets it
       * as a regular click, which triggers the opening of the
       * options list.
       */
      event.stopPropagation()

      onDelete()
    }
  }

  return (
    <Root
      role={role || (onDelete || onClick ? 'button' : undefined)}
      aria-disabled={disabled}
      ref={ref}
      className={twMerge(
        `text-lg transition-none border border-solid rounded-[6.25rem]
          h-6 max-w-full inline-flex justify-center items-center cursor-default bg-white
          group align-middle`,
        'leading-[inherit]',
        classByVariant[variant],
        className,
        disabled && 'text-gray-500 border-gray-200 pointer-events-none'
      )}
      style={style}
      onClick={onClick}
      tabIndex={onDelete || onClick ? 0 : undefined}
      {...rest}
    >
      {icon && (
        <span
          className={twMerge(
            'w-min h-min flex items-center -mr-1 ml-3',
            disabled ? 'text-gray-500' : 'text-graphite-700'
          )}
        >
          {icon}
        </span>
      )}

      <span className='flex gap-2 px-3 overflow-hidden items-center'>
        <Typography
          size='xsmall'
          color='inherit'
          weight='semibold'
          as='span'
          titleCase={titleCase}
          className='leading-[inherit]'
          noWrap
        >
          {children}
        </Typography>

        {endAdornment}
      </span>

      {onDelete && (
        <span
          aria-label='delete icon'
          role='button'
          className='w-min h-min flex items-center cursor-pointer -ml-2 mr-2'
          onClick={handleDelete}
        >
          <CloseMinor16 />
        </span>
      )}
    </Root>
  )
})

Tag.defaultProps = {
  as: 'div',
  children: '',
  variant: 'light-grey',
}

Tag.displayName = 'Tag'

export default Tag
