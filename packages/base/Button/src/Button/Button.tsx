import type { ReactNode, ReactElement, MouseEvent, ElementType } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type {
  StandardProps,
  SizeType,
  ButtonOrAnchorProps,
  OverridableComponent,
  TextLabelProps,
} from '@toptal/picasso-shared'
import { noop, withClasses } from '@toptal/picasso-utils'
// we need to ensure the correct order of styles import
// TODO: [FX-4614] To be removed when Link component is migrated to tailwind
import { Link } from '@toptal/picasso-link'

import { ButtonBase } from '../ButtonBase'
import {
  createVariantClassNames,
  createCoreClassNames,
  createSizeClassNames,
  createIconClassNames,
} from './styles'

// HACK: This statement is only used to prevent webpack from tree shaking the import
void Link

export type VariantType =
  | 'primary'
  | 'negative'
  | 'positive'
  | 'secondary'
  | 'transparent'

export type IconPositionType = 'left' | 'right'

export type ButtonClassKey = 'root' | 'label' | 'icon'

export interface Props
  extends Omit<StandardProps, 'classes'>,
    TextLabelProps,
    ButtonOrAnchorProps {
  /** Show button in the active state (left mouse button down) */
  active?: boolean
  as?: ElementType
  /** Disables button */
  disabled?: boolean
  /** Content of Button component */
  children?: ReactNode
  /** Override or extend the styles applied to the component slots */
  classes?: Partial<Record<ButtonClassKey, string>>
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

export const Button: OverridableComponent<Props> = forwardRef<
  HTMLButtonElement,
  Props
>(function Button(
  {
    active = false,
    as = 'button',
    children = null,
    classes,
    disabled = false,
    focused = false,
    fullWidth = false,
    hovered = false,
    iconPosition = 'left',
    loading = false,
    onClick = noop,
    size = 'medium',
    type = 'button',
    variant = 'primary',
    ...props
  },
  ref
) {
  const { icon, className, ...rest } = props

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
    loading,
  })
  const sizeClassNames = createSizeClassNames(size)

  const contentSizeClassNames: Record<
    SizeType<'small' | 'medium' | 'large'>,
    string[]
  > = {
    small: ['text-button-small'],
    medium: ['text-button-medium'],
    large: ['text-button-large'],
  }

  const iconClassNames = icon
    ? cx(
        createIconClassNames({
          size,
          iconPosition: children && iconPosition ? iconPosition : undefined,
        })
      )
    : ''

  const baseClasses: Record<ButtonClassKey, string> = {
    root: cx(
      coreClassNames,
      variantClassNames,
      sizeClassNames,
      fullWidth ? 'w-full' : ''
    ),
    label: cx(
      'font-semibold whitespace-nowrap',
      contentSizeClassNames[size],
      loading ? 'opacity-0' : ''
    ),
    icon: iconClassNames,
  }

  const merged = withClasses(baseClasses, classes)

  const iconComponent = icon
    ? React.cloneElement(icon, {
        className: twMerge(merged.icon, icon.props.className),
      })
    : undefined

  const finalClassName = twMerge(merged.root, className)

  return (
    <ButtonBase
      {...rest}
      ref={ref}
      className={finalClassName}
      contentClassName={merged.label}
      icon={iconComponent}
      iconPosition={iconPosition}
      loading={loading}
      disabled={disabled}
      as={as}
      type={type}
      onClick={onClick}
      children={children}
    />
  )
})

Button.displayName = 'Button'

export default Button
