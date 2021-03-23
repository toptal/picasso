import cx from 'classnames'
import React, { forwardRef } from 'react'
import ButtonBase from '@material-ui/core/ButtonBase'
import { makeStyles } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'

import { Container } from '../Container'
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

export const TabScrollButton = forwardRef<HTMLDivElement, Props>(
  function TabScrollButton (props, ref) {
    const { className, style, direction, disabled, ...rest } = props
    const classes = useStyles()

    if (disabled) {
      return null
    }

    return (
      <Container
        {...rest}
        ref={ref}
        className={cx(classes.root, className)}
        style={style}
      >
        <Container
          className={cx(classes.gradient, {
            [classes.left]: direction === 'left',
            [classes.right]: direction === 'right'
          })}
        >
          <ButtonBase
            className={cx(classes.button, {
              [classes.left]: direction === 'left',
              [classes.right]: direction === 'right'
            })}
            aria-label={`${direction} button`}
            data-testid={`tab-scroll-button-${direction}`}
          >
            {direction === 'left' ? <BackMinor16 /> : <ChevronMinor16 />}
          </ButtonBase>
        </Container>
      </Container>
    )
  }
)

TabScrollButton.displayName = 'TabScrollButton'

export default TabScrollButton
