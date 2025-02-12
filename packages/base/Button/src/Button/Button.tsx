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
import { noop } from '@toptal/picasso-utils'
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
    className: twMerge(iconClassNames, icon.props.className),
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
    loading,
  })
  const sizeClassNames = createSizeClassNames(size)

  const finalClassName = twMerge(
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
      disabled={disabled}
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
