import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgExclamation = (props: Props) => {
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
        <path d='M7.294 4v5.176a.941.941 0 1 0 1.882 0V4a.941.941 0 0 0-1.882 0zM8.235 12.941a.941.941 0 1 0 0-1.882.941.941 0 0 0 0 1.882z' />
        <path d='M7.765 15.53a7.765 7.765 0 1 0 0-15.53 7.765 7.765 0 0 0 0 15.53zm0-.471a7.294 7.294 0 1 1 0-14.588 7.294 7.294 0 0 1 0 14.588z' />
      </g>
    </svg>
  )
}

SvgExclamation.displayName = 'SvgExclamation'
export default withStyles(styles)(SvgExclamation)
