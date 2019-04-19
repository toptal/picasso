import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  width?: number
  height?: number
}

const SvgPlus = (props: Props) => {
  const { classes, className, style, width, height } = props

  return (
    <svg
      {...props}
      viewBox='0 0 24 24'
      className={cx(classes.root, className)}
      style={style}
      height={height}
      width={width}
    >
      <g fillRule='nonzero'>
        <path d='M11.5 5v14h1V5z' />
        <path d='M5 12.5h14v-1H5z' />
      </g>
    </svg>
  )
}

SvgPlus.displayName = 'SvgPlus'
export default withStyles(styles)(SvgPlus)
