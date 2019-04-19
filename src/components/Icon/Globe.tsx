import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgGlobe = (props: Props) => {
  const { classes, className, style, size, color } = props
  const svgStyle = {
    fontSize: size ? `${size}rem` : 'inherit',
    ...style
  }

  return (
    <svg
      {...props}
      viewBox='0 0 24 24'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
    >
      <g fillRule='nonzero'>
        <path d='M11.98 20c4.375 0 7.92-3.582 7.92-8s-3.545-8-7.92-8-7.92 3.582-7.92 8 3.545 8 7.92 8zm0-.5c-4.097 0-7.42-3.357-7.42-7.5s3.323-7.5 7.42-7.5c4.097 0 7.42 3.357 7.42 7.5s-3.323 7.5-7.42 7.5z' />
        <path d='M11.98 20c2.301 0 4.08-3.6 4.08-8s-1.779-8-4.08-8S7.9 7.6 7.9 12s1.779 8 4.08 8zm0-.5c-1.93 0-3.58-3.34-3.58-7.5s1.65-7.5 3.58-7.5c1.93 0 3.58 3.34 3.58 7.5s-1.65 7.5-3.58 7.5z' />
      </g>
    </svg>
  )
}

SvgGlobe.displayName = 'SvgGlobe'
export default withStyles(styles)(SvgGlobe)
