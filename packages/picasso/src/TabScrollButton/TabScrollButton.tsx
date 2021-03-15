import cx from 'classnames'
import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import { BaseProps } from '@toptal/picasso-shared'

import { BackMinor16, ChevronMinor16 } from '../Icon'
import styles from './styles'

type DirectionType = 'left' | 'right'

export interface Props extends BaseProps {
  /** The direction the button should indicate. */
  direction: DirectionType
  /** If `true`, the component is disabled. */
  disabled?: boolean
}

const useStyles = makeStyles(styles, {
  name: 'PicassoTabScrollButton'
})

export const TabScrollButton = forwardRef<HTMLButtonElement, Props>(
  function TabScrollButton (props, ref) {
    const { className, style, direction, disabled, ...rest } = props
    const classes = useStyles()

    return (
      <ButtonBase
        {...rest}
        ref={ref}
        className={cx(
          classes.root,
          { [classes.disabled]: disabled },
          className
        )}
        style={style}
        disabled={disabled}
        aria-label={`${direction} button`}
        data-testid={`tab-scroll-button-${direction}`}
      >
        {direction === 'left' ? <BackMinor16 /> : <ChevronMinor16 />}
      </ButtonBase>
    )
  }
)

TabScrollButton.displayName = 'TabScrollButton'

export default TabScrollButton
