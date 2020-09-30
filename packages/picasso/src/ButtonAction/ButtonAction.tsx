import React, { ReactElement, MouseEvent, forwardRef, ElementType } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps, ButtonOrAnchorProps } from '@toptal/picasso-shared'

import Button from '../Button'
import styles from './styles'

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
  /** HTML Value of Button component */
  value?: string | number
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoButtonAction'
})

export const ButtonAction = forwardRef<HTMLButtonElement, Props>(
  function ButtonAction(props, ref) {
    const { className, active, focused, hovered, disabled, ...rest } = props
    const classes = useStyles(props)

    const { root: rootClass, content, icon } = classes

    const rootClassName = cx(
      {
        [classes.active]: active,
        [classes.focused]: focused,
        [classes.hovered]: hovered,
        [classes.disabled]: disabled
      },
      rootClass
    )

    return (
      <Button
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        iconPosition='left'
        variant='secondary'
        classes={{
          root: rootClassName,
          content,
          icon
        }}
        className={className}
        size='small'
        active={active}
        hovered={hovered}
        focused={focused}
        disabled={disabled}
      />
    )
  }
)

ButtonAction.defaultProps = {}

ButtonAction.displayName = 'ButtonAction'

export default ButtonAction
