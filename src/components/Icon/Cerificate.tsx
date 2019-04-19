import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgCerificate = (props: Props) => {
  const { classes, className, style, size, color } = props
  const svgStyle = {
    fontSize: size && `${size}rem`,
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
        <path d='M4.25 19.25v-16h12V5a.25.25 0 1 0 .5 0V2.75h-13v17H12a.25.25 0 1 0 0-.5H4.25z' />
        <path d='M16.5 15.75a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5zm0-.5a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5z' />
        <path d='M18.379 19.719a.25.25 0 0 0 .371-.219V15a.25.25 0 1 0-.5 0v4.075l-1.629-.905a.25.25 0 0 0-.242 0l-1.629.905V15a.25.25 0 1 0-.5 0v4.5c0 .19.205.311.371.219l1.879-1.044 1.879 1.044z' />
      </g>
    </svg>
  )
}

SvgCerificate.displayName = 'SvgCerificate'
export default withStyles(styles)(SvgCerificate)
