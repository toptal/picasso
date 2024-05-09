import type { ReactElement, MouseEventHandler } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps, TextLabelProps } from '@toptal/picasso-shared'
import { twMerge } from 'tailwind-merge'

import { Tag } from '../Tag'

type ClickType = MouseEventHandler<HTMLElement>

export interface Props extends BaseProps, TextLabelProps {
  hovered?: boolean
  /** Represents visual state of component */
  checked?: boolean
  /** Text content of the `Tag` component */
  children: string
  /** Defines if `Tag` is disabled */
  disabled?: boolean
  /** Specify the icon which should be rendered inside Tag */
  icon?: ReactElement
  onClick?: ClickType
  /** Callback invoked when component is clicked */
  onChange?: (checked: boolean) => void
}

const TagCheckable = forwardRef<HTMLDivElement, Props>(function TagCheckable(
  {
    checked = false,
    children,
    icon,
    onClick,
    onChange,
    className,
    hovered,
    ...rest
  },
  ref
) {
  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    onChange?.(!checked)
    onClick?.(e)
  }

  const variant = checked ? 'green' : 'light-grey'

  return (
    <Tag
      className={twMerge(
        `hover:border-graphite-700 transition-all duration-[350ms] ease-in-out cursor-pointer`,
        className,
        checked && 'hover:border-red-500 hover:text-red-500',
        hovered && 'border-graphite-700',
        checked && hovered && 'border-red-500 text-red-500'
      )}
      hovered={hovered}
      icon={icon}
      onClick={handleClick}
      ref={ref}
      variant={variant}
      {...rest}
    >
      {children}
    </Tag>
  )
})

export default TagCheckable
