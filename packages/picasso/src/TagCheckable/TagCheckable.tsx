import React, { ReactElement, MouseEventHandler } from 'react'
import { BaseProps, TextLabelProps } from '@toptal/picasso-shared'

import Tag from '../Tag'

type ClickType = MouseEventHandler<HTMLDivElement>

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

const TagCheckable = ({
  hovered,
  checked = false,
  children,
  icon,
  onClick,
  onChange,
  ...rest
}: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onChange?.(!checked)
    onClick?.(e)
  }

  const variant = checked ? 'positive' : 'light'

  return (
    <Tag
      icon={icon}
      variant={variant}
      onClick={handleClick}
      hovered={hovered}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default TagCheckable
