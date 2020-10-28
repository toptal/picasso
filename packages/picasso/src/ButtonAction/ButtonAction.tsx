import React, { ReactElement, MouseEvent, forwardRef, ElementType } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps, ButtonOrAnchorProps } from '@toptal/picasso-shared'
import ButtonBase from '@material-ui/core/ButtonBase'

import styles from './styles'

export type IconPositionType = 'left' | 'right'

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

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoButtonAction'
})


export const ButtonAction = forwardRef<HTMLButtonElement, Props>(
  function ButtonAction(props, ref) {
    const {
      className,
      active,
      focused,
      hovered,
      disabled,
      loading,
      icon,
      iconPosition,
      ...rest
    } = props

    return (
      <ButtonBase
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        className={className}
        disabled={disabled}
      >
        T
      </ButtonBase>
    )
  }
)

ButtonAction.defaultProps = {
  iconPosition: 'left'
}

ButtonAction.displayName = 'ButtonAction'

export default ButtonAction
