import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgLocation = (props: Props) => {
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
        <path d='M18.63 10.19c0 1.01-.492 2.254-1.384 3.692a25.426 25.426 0 0 1-1.766 2.462 41.552 41.552 0 0 1-3.116 3.455.25.25 0 0 1-.348 0 40.523 40.523 0 0 1-.975-1.002A41.741 41.741 0 0 1 8.9 16.34a25.576 25.576 0 0 1-1.756-2.447C6.246 12.45 5.75 11.201 5.75 10.19a6.438 6.438 0 0 1 6.44-6.44 6.438 6.438 0 0 1 6.44 6.44zm-6.352 8.99a41.06 41.06 0 0 0 2.812-3.148 24.94 24.94 0 0 0 1.731-2.414c.847-1.365 1.309-2.533 1.309-3.428a5.938 5.938 0 0 0-5.94-5.94 5.938 5.938 0 0 0-5.94 5.94c0 .896.465 2.068 1.318 3.44a25.09 25.09 0 0 0 1.722 2.397 41.25 41.25 0 0 0 2.9 3.241l.088-.089z' />
        <path d='M12.19 11.74a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6zm0-.5a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6z' />
      </g>
    </svg>
  )
}

SvgLocation.displayName = 'SvgLocation'
export default withStyles(styles)(SvgLocation)
