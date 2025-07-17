import type { ReactNode, MouseEvent, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { SizeType, BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import { ArrowDownMinor24, ArrowDownMinor16 } from '@toptal/picasso-icons'
import { Dropdown } from '@toptal/picasso-dropdown'

import type { ButtonProps } from '../Button'
import { Button } from '../Button'
import { ButtonGroup } from '../ButtonGroup'
import { createButtonGroupItemClassNames } from '../ButtonGroupItem/styles'
import {
  createActionButtonClassNames,
  createMenuButtonClassNames,
} from './styles'

export interface Props
  extends BaseProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Content of Button component */
  children: ReactNode
  /** Content element that opens when anchor is clicked */
  menu: ReactNode
  /** Callback invoked when component is clicked */
  onClick?: ButtonProps['onClick']
  /** A button can have different sizes */
  size?: ButtonProps['size']
  /** The variant to use */
  variant?: 'primary' | 'secondary'
  /** Is component disaled or not */
  disabled?: boolean
  // Internal props
  menuButtonProps?: Omit<ButtonProps, 'children'>
  actionButtonProps?: Omit<ButtonProps, 'children'>
  testIds?: {
    actionButton?: string
    menuButton?: string
  }
}

const DropdownIcon = ({
  size,
  className,
}: {
  size: SizeType<'small' | 'medium' | 'large'>
  className?: string
}) => {
  if (size === 'large') {
    return <ArrowDownMinor24 className={className} />
  }

  return <ArrowDownMinor16 className={className} />
}

const EventStopPropagation = ({ children }: { children: ReactNode }) => {
  const handleClick = (
    event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>
  ) => {
    event.stopPropagation()
  }

  return <span onClick={handleClick}>{children}</span>
}

export const ButtonSplit = forwardRef<HTMLDivElement, Props>(
  function ButtonSplit(
    { size = 'medium', variant = 'primary', ...props },
    ref
  ) {
    const {
      menu,
      children,
      disabled,
      style,
      className,
      onClick,
      menuButtonProps,
      actionButtonProps,
      testIds = {},
      ...rest
    } = props

    const renderMenuButton = ({ isOpen }: { isOpen: boolean }) => {
      const menuButtonClassName = twMerge(
        createButtonGroupItemClassNames({
          active: menuButtonProps?.active,
          hovered: menuButtonProps?.hovered,
          disabled: menuButtonProps?.disabled || disabled,
          focused: menuButtonProps?.focused,
        }),
        createMenuButtonClassNames({
          variant,
          size,
          disabled: menuButtonProps?.disabled || disabled,
        }),
        menuButtonProps?.className
      )

      const iconClassName = isOpen ? 'rotate-180' : ''

      const menuButton = (
        <Button
          {...menuButtonProps}
          variant={variant}
          className={menuButtonClassName}
          size={size}
          disabled={disabled}
          data-testid={testIds.menuButton}
        >
          <DropdownIcon className={iconClassName} size={size} />
        </Button>
      )

      return disabled ? (
        <EventStopPropagation>{menuButton}</EventStopPropagation>
      ) : (
        menuButton
      )
    }

    const actionButtonClassName = twMerge(
      createButtonGroupItemClassNames({
        active: actionButtonProps?.active,
        hovered: actionButtonProps?.hovered,
        disabled: actionButtonProps?.disabled || disabled,
        focused: actionButtonProps?.focused,
      }),
      createActionButtonClassNames({
        variant,
      }),
      actionButtonProps?.className
    )

    const dropdownClassName = twMerge(
      'inline-flex cursor-pointer',
      disabled && '[&>div]:cursor-auto'
    )

    return (
      <ButtonGroup {...rest} ref={ref} style={style} className={className}>
        <Button
          {...actionButtonProps}
          className={actionButtonClassName}
          size={size}
          variant={variant}
          disabled={disabled}
          onClick={onClick}
          data-testid={testIds.actionButton}
        >
          {children}
        </Button>
        <Dropdown content={menu} className={dropdownClassName}>
          {({ isOpen }: { isOpen: boolean }) => renderMenuButton({ isOpen })}
        </Dropdown>
      </ButtonGroup>
    )
  }
)

ButtonSplit.displayName = 'ButtonSplit'

export default ButtonSplit
