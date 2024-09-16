import type { ReactElement, MouseEvent, ElementType } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import type { BaseProps, ButtonOrAnchorProps } from '@toptal/picasso-shared'

import { ButtonBase } from '../ButtonBase'
import { createRootClassNames, createVariantClassNames } from './styles'

export type VariantType = 'primary' | 'flat' | 'transparent'

export interface Props extends BaseProps, ButtonOrAnchorProps {
  /** Show button in the active state (left mouse button down) */
  active?: boolean
  /** The component used for the root node. Either a string to use a DOM element or a component. */
  as?: ElementType
  /** Disables button */
  disabled?: boolean
  /** Set focused style for the button */
  focused?: boolean
  /** Set hovered style for the button */
  hovered?: boolean
  /** Add an `<Icon />` along Button's children */
  icon?: ReactElement
  /** Shows a loading indicator and disables click events */
  loading?: boolean
  /** Callback invoked when component is clicked */
  onClick?: (event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => void
  /** The variant to use */
  variant?: VariantType
  /** HTML Value of Button component */
  value?: string | number
  /** Adjust button size to be bigger on screens under xl  */
  responsive?: boolean
}

export const ButtonCircular = forwardRef<HTMLButtonElement, Props>(
  function ButtonCircular(props, ref) {
    const {
      className,
      variant = 'primary',
      active,
      focused,
      hovered,
      disabled,
      responsive,
      loading,
      ...rest
    } = props
    const variantClassNames = createVariantClassNames(variant, {
      disabled,
      focused,
      hovered,
      active,
    })

    const finalClassName = cx(
      createRootClassNames({ responsive, active, disabled, focused, hovered }),
      variantClassNames,
      className
    )

    const contentClassName = cx(
      'font-semibold whitespace-nowrap',
      'text-button-small',
      loading ? 'opacity-0' : ''
    )

    return (
      <ButtonBase
        {...rest}
        ref={ref}
        loading={loading}
        className={finalClassName}
        contentClassName={contentClassName}
        disabled={disabled}
      />
    )
  }
)

ButtonCircular.defaultProps = {
  variant: 'primary',
}

ButtonCircular.displayName = 'ButtonCircular'

export default ButtonCircular
