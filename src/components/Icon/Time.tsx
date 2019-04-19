import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgTime = (props: Props) => {
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
        <path d='M12.158 12.176l3.58-3.62a.25.25 0 0 0-.356-.352l-3.58 3.62a.25.25 0 0 0 .356.352z' />
      </g>
    </svg>
  )
}

SvgTime.displayName = 'SvgTime'
export default withStyles(styles)(SvgTime)
