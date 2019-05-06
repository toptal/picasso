import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgClose = (props: Props) => {
  const { classes, className, style, size, color } = props
  const svgStyle = {
    fontSize: size && `${size}rem`,
    ...style
  }

  return (
    <svg
      {...props}
      viewBox='0 0 16 16'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
    >
      <path d='M4.65 4L4 4.65 7.35 8 4 11.35l.65.65L8 8.65 11.35 12l.65-.65L8.65 8 12 4.65 11.35 4 8 7.35z' />
    </svg>
  )
}

SvgClose.displayName = 'SvgClose'
export default withStyles(styles)(SvgClose)
