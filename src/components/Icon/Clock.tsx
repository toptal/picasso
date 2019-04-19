import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgClock = (props: Props) => {
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
        <path d='M21 12c0 4.984-4.016 9-9 9s-9-4.016-9-9 4.016-9 9-9 9 4.016 9 9zm-.5 0c0-4.709-3.791-8.5-8.5-8.5A8.482 8.482 0 0 0 3.5 12c0 4.709 3.791 8.5 8.5 8.5s8.5-3.791 8.5-8.5z' />
        <path d='M11.968 7.5H11.5V13H16v-.507h-4.032z' />
      </g>
    </svg>
  )
}

SvgClock.displayName = 'SvgClock'
export default withStyles(styles)(SvgClock)
