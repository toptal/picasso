import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgTick = (props: Props) => {
  const { classes, className, style, size, color } = props
  const svgStyle = {
    fontSize: size && `${size}rem`,
    ...style
  }

  return (
    <svg
      viewBox='0 0 16 16'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
    >
      <path d='M5.804 9.76L7.085 11 12 6.24 10.72 5 7.085 8.52 5.28 6.771 4 8.012z' />
    </svg>
  )
}

SvgTick.displayName = 'SvgTick'
export default withStyles(styles)(SvgTick)
