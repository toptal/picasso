import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgInstagram = (props: Props) => {
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
      <g fillRule='evenodd'>
        <path d='M14.02 11.64a2.95 2.94 0 0 1-2.88 3.01h-6.9a2.95 2.94 0 0 1-2.87-3.01v-7.2a2.95 2.94 0 0 1 2.88-3.02h6.89a2.95 2.94 0 0 1 2.88 3.01v7.2zM11.14 0h-6.9A4.36 4.34 0 0 0 0 4.44v7.2c0 2.45 1.9 4.44 4.25 4.44h6.89a4.35 4.35 0 0 0 4.24-4.44v-7.2c0-2.45-1.9-4.44-4.24-4.44z' />
        <path d='M7.7 11.43a3.03 3.02 0 0 1-3.03-3A3.03 3.02 0 0 1 7.69 5.4a3.03 3.02 0 0 1 3.03 3.02 3.03 3.02 0 0 1-3.03 3.01m0-7.6a4.62 4.6 0 0 0-4.61 4.6A4.62 4.6 0 0 0 7.69 13a4.62 4.6 0 0 0 4.62-4.59 4.62 4.6 0 0 0-4.62-4.6m3.46-1.52a1.15 1.15 0 1 0 1.16 1.15 1.15 1.15 0 0 0-1.16-1.15' />
      </g>
    </svg>
  )
}

SvgInstagram.displayName = 'SvgInstagram'
export default withStyles(styles)(SvgInstagram)
