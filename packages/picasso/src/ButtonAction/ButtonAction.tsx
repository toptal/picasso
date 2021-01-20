import React, { ReactElement, MouseEvent, forwardRef, ElementType } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps, ButtonOrAnchorProps } from '@toptal/picasso-shared'

import Button, { IconPositionType } from '../Button'
import styles from './styles'
import Loader from '../Loader'

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

// Using { index: -1 } to inject CSS link to the bottom of the head
// in order to prevent Button's styles to override ButtonAction's ones
// Related Jira issue: https://toptal-core.atlassian.net/browse/FX-1520
const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoButtonAction',
  index: -1
})

const loaderIcon = <Loader size='small' variant='inherit' />

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
      onClick,
      ...rest
    } = props
    const classes = useStyles()

    const {
      root: rootClass,
      content,
      icon: iconClassName,
      iconLeft,
      iconRight,
      small
    } = classes

    const rootClassName = cx(
      {
        [classes.active]: active,
        [classes.focused]: focused,
        [classes.hovered]: hovered,
        [classes.disabled]: disabled,
        [classes.loading]: loading,
        [classes.iconless]: !icon
      },
      rootClass
    )

    const usedIcon = loading ? loaderIcon : icon
    const usedIconPosition = icon ? iconPosition : 'right'

    return (
      <Button
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        icon={usedIcon}
        iconPosition={usedIconPosition}
        onClick={loading ? undefined : onClick}
        variant='secondary'
        classes={{
          root: rootClassName,
          content,
          icon: iconClassName,
          iconLeft,
          iconRight,
          small
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

ButtonAction.defaultProps = {
  iconPosition: 'left'
}

ButtonAction.displayName = 'ButtonAction'

export default ButtonAction
