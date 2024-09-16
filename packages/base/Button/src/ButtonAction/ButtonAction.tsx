import type { ReactElement, MouseEvent, ElementType, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import type { BaseProps, ButtonOrAnchorProps } from '@toptal/picasso-shared'
import { Loader } from '@toptal/picasso-loader'

import type { IconPositionType } from '../Button'
import { ButtonBase } from '../ButtonBase'
import { createRootClassNames, createIconClassNames } from './styles'

const getIcon = ({
  children,
  icon,
  iconPosition,
}: {
  children: ReactNode
  icon?: ReactElement
  iconPosition?: IconPositionType
}) => {
  if (!icon) {
    return null
  }

  const iconClassNames = createIconClassNames({
    iconPosition: children && iconPosition ? iconPosition : undefined,
  })

  return React.cloneElement(icon, {
    className: cx(iconClassNames, icon.props.className),
  })
}

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
  /** Icon can be positioned on the left or right */
  iconPosition?: IconPositionType
  /** Shows a loading indicator and disables click events */
  loading?: boolean
  /** Callback invoked when component is clicked */
  onClick?: (event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => void
  /** HTML Value of Button component */
  value?: string | number
}

const loaderIcon = <Loader size='small' variant='inherit' />

export const ButtonAction = forwardRef<HTMLButtonElement, Props>(
  function ButtonAction(props, ref) {
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      // We use these props only to determine styles
      active,
      focused,
      hovered,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      className,
      disabled,
      loading,
      icon,
      iconPosition,
      onClick,
      ...rest
    } = props

    const usedIcon = loading ? loaderIcon : icon
    const usedIconPosition = icon ? iconPosition : 'right'

    const finalClassName = cx(createRootClassNames(props), className)
    const finalIcon = getIcon({
      children: rest.children,
      icon: usedIcon,
      iconPosition: usedIconPosition,
    })

    return (
      <ButtonBase
        {...rest}
        ref={ref}
        icon={finalIcon}
        iconPosition={usedIconPosition}
        onClick={loading ? undefined : onClick}
        className={finalClassName}
        contentClassName='font-semibold text-blue-500 text-md'
        disabled={disabled}
      />
    )
  }
)

ButtonAction.defaultProps = {
  iconPosition: 'left',
}

ButtonAction.displayName = 'ButtonAction'

export default ButtonAction
