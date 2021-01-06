import React, { forwardRef } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import styles from './styles'

type ColorType = 'red' | 'yellow' | 'blue' | 'green' | 'light-grey'

export interface Props extends StandardProps {
  /** Indicator color */
  color: ColorType
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoIndicator' })

export const Indicator = forwardRef<HTMLDivElement, Props>(function Indicator(
  props,
  ref
) {
  const { className, color, style, ...restProps } = props
  const classes = useStyles()

  return (
    <div
      role='img'
      {...restProps}
      className={cx(classes.root, className, classes[color])}
      style={style}
      ref={ref}
    />
  )
})

Indicator.displayName = 'Indicator'

export default Indicator
