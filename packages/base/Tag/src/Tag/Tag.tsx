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
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { classByVariant } from './styles'

export type Variant = 'light-grey' | 'blue' | 'green' | 'yellow' | 'red'

export type DivOrAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  HTMLAttributes<HTMLDivElement>

export interface Props extends BaseProps, TextLabelProps, DivOrAnchorProps {
  /** The component used for the root node. Either a string to use a DOM element or a component. */
  as?: ElementType
  /** Text content of the `Tag` component */
  children?: ReactNode
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

type IconProps = {
  className?: string
  color?: string
}

const DeleteIcon = ({ onClick }: { onClick: (event: MouseEvent) => void }) => (
  <span
    aria-label='delete icon'
    role='button'
    className='w-min h-min flex items-center cursor-pointer -ml-2 mr-2'
    onClick={onClick}
  >
    <CloseMinor16 />
  </span>
)

const cloneIcon = (icon: ReactNode, disabled?: boolean) => {
  if (!icon || !React.isValidElement<IconProps>(icon)) {
    return null
  }

  return React.cloneElement(icon, {
    color: disabled ? 'grey' : icon.props.color || 'darkGrey',
    className: twMerge('flex items-center -mr-1 ml-3', icon.props.className),
  })
}

export const Tag = forwardRef<HTMLDivElement, Props>(function Tag(
  { as: Root = 'div', children = '', variant = 'light-grey', ...props },
  ref
) {
  const {
    className,
    disabled,
    endAdornment,
    icon,
    onDelete,
    onClick,
    style,
    titleCase: propsTitleCase,
    role,
    ...rest
  } = props

  const titleCase = useTitleCase(propsTitleCase)
  const isInteractive = onDelete || onClick

  const handleDelete = (event: MouseEvent) => {
    if (!disabled && onDelete) {
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

  const clonedIcon = cloneIcon(icon, disabled)

  return (
    <Root
      role={role || (isInteractive ? 'button' : undefined)}
      aria-disabled={disabled}
      ref={ref}
      className={twMerge(
        `text-lg transition-none border border-solid rounded-[6.25rem]
        h-6 max-w-full inline-flex justify-center items-center cursor-default bg-white
        group align-middle leading-[inherit]`,
        classByVariant[variant],
        className,
        disabled && 'text-gray-500 border-gray-200 pointer-events-none'
      )}
      style={style}
      onClick={onClick}
      tabIndex={isInteractive ? 0 : undefined}
      {...rest}
    >
      {clonedIcon}
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
      {onDelete && <DeleteIcon onClick={handleDelete} />}
    </Root>
  )
})

Tag.displayName = 'Tag'

export default Tag
