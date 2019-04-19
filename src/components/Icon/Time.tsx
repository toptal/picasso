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
      <g fillRule='nonzero'>
        <path d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm0-.532A7.465 7.465 0 0 1 .538 8 7.465 7.465 0 0 1 8 .532 7.465 7.465 0 0 1 15.462 8 7.465 7.465 0 0 1 8 15.468z' />
        <path d='M7.86 7.938l3.58-3.62a.267.267 0 1 0-.38-.376l-3.58 3.62a.267.267 0 1 0 .38.376z' />
      </g>
    </svg>
  )
}

SvgTime.displayName = 'SvgTime'
export default withStyles(styles)(SvgTime)
