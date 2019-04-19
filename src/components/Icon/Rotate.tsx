import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgRotate = (props: Props) => {
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
        <path d='M5.449 18.464h14.4v1.2h-15.6v-8.4h1.2zM18.649 5.264h-13.2v-1.2h14.4v7.2h-1.2z' />
        <path d='M16.424 16.249l.849-.849 3.424 3.424-3.424 3.425-.849-.849L19 18.824zM8.273 7l-.849.849L4 4.424 7.424 1l.849.849-2.576 2.575z' />
      </g>
    </svg>
  )
}

SvgRotate.displayName = 'SvgRotate'
export default withStyles(styles)(SvgRotate)
