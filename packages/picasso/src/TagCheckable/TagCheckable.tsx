import cx from 'classnames'
import React, { ReactElement, MouseEventHandler, forwardRef } from 'react'
import { BaseProps, TextLabelProps } from '@toptal/picasso-shared'

import Tag from '../Tag'
import { useStyles } from '../Tag/Tag'

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
  { checked = false, children, icon, onClick, onChange, className, ...rest },
  ref
) {
  const classes = useStyles()

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    onChange?.(!checked)
    onClick?.(e)
  }

  const variant = checked ? 'green' : 'light-grey'

  return (
    <Tag
      className={cx(className, classes.checkable)}
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
