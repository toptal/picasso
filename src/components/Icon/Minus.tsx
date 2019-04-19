import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  width?: number
  height?: number
}

const SvgMinus = (props: Props) => {
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
      <path d='M19.96 12.204H4V11h15.96z' fillRule='evenodd' />
    </svg>
  )
}

SvgMinus.displayName = 'SvgMinus'
export default withStyles(styles)(SvgMinus)
