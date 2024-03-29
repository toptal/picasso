import type { ReactNode, ReactElement, MouseEvent, ElementType } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import type {
  StandardProps,
  SizeType,
  ButtonOrAnchorProps,
  OverridableComponent,
  TextLabelProps,
} from '@toptal/picasso-shared'
import { noop } from '@toptal/picasso-utils'

import { ButtonBase } from '../ButtonBase'
import {
  createVariantClassNames,
  createCoreClassNames,
  createSizeClassNames,
  createIconClassNames,
} from './styles'

export type VariantType =
  | 'primary'
  | 'negative'
  | 'positive'
  | 'secondary'
  | 'transparent'

export type IconPositionType = 'left' | 'right'

export interface Props
  extends StandardProps,
    TextLabelProps,
    ButtonOrAnchorProps {
  /** Show button in the active state (left mouse button down) */
  active?: boolean
  as?: ElementType
  /** Disables button */
  disabled?: boolean
  /** Content of Button component */
  children?: ReactNode
  focused?: boolean
  /** Take the full width of a container */
  fullWidth?: boolean
  /** Set hovered style for the button */
  hovered?: boolean
  /** Add an `<Icon />` along Button's children */
  icon?: ReactElement
  /** Icon can be positioned on the left or right */
  iconPosition?: IconPositionType
  /** Shows a loading indicator and disables click events */
  loading?: boolean
  /** Callback invoked when component is clicked */
  onClick?: (event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => void
  /** A button can have different sizes */
  size?: SizeType<'small' | 'medium' | 'large'>
  /** The variant to use */
  variant?: VariantType
  /** HTML Value of Button component */
  value?: string | number
  /** HTML title of Button component */
  title?: string
  /** HTML type of Button component */
  type?: 'button' | 'reset' | 'submit'
}

const getIcon = ({
  children,
  icon,
  iconPosition,
  size,
}: {
  children: ReactNode
  icon?: ReactElement
  iconPosition?: IconPositionType
  size: SizeType<'small' | 'medium' | 'large'>
}) => {
  if (!icon) {
    return undefined
  }

  const iconClassNames = createIconClassNames({
    size,
    iconPosition: children && iconPosition ? iconPosition : undefined,
  })

  return React.cloneElement(icon, {
    className: cx(iconClassNames, icon.props.className),
  })
}

export const Button: OverridableComponent<Props> = forwardRef<
  HTMLButtonElement,
  Props
>(function Button(props, ref) {
  const {
    icon,
    iconPosition,
    loading,
    className,
    fullWidth,
    variant = 'primary',
    size = 'medium',
    focused,
    hovered,
    disabled,
    active,
    ...rest
  } = props

  const iconComponent = getIcon({
    children: rest.children,
    icon,
    iconPosition,
    size,
  })
  const coreClassNames = createCoreClassNames({
    disabled,
    focused,
    hovered,
    active,
  })
  const variantClassNames = createVariantClassNames(variant, {
    disabled,
    focused,
    hovered,
    active,
  })
  const sizeClassNames = createSizeClassNames(size)

  const finalClassName = cx(
    coreClassNames,
    variantClassNames,
    sizeClassNames,
    fullWidth ? 'w-full' : '',
    className
  )

  const contentSizeClassNames: Record<
    SizeType<'small' | 'medium' | 'large'>,
    string[]
  > = {
    small: ['text-button-small'],
    medium: ['text-button-medium'],
    large: ['text-button-large'],
  }

  const contentClassName = cx(
    'font-semibold whitespace-nowrap',
    contentSizeClassNames[size],
    loading ? 'opacity-0' : ''
  )

  return (
    <ButtonBase
      {...rest}
      ref={ref}
      className={finalClassName}
      contentClassName={contentClassName}
      icon={iconComponent}
      iconPosition={iconPosition}
      loading={loading}
      focused={focused}
      hovered={hovered}
      disabled={disabled}
      active={active}
    />
  )
})

Button.defaultProps = {
  active: false,
  as: 'button',
  children: null,
  disabled: false,
  focused: false,
  fullWidth: false,
  hovered: false,
  iconPosition: 'left',
  loading: false,
  onClick: noop,
  size: 'medium',
  type: 'button',
  variant: 'primary',
}

Button.displayName = 'Button'

export default Button
