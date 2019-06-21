import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgOverlap = (props: Props) => {
  const { classes, className, style, size, color } = props
  const svgStyle = {
    fontSize: size && `${size}rem`,
    ...style
  }

  return (
    <svg
      viewBox='0 0 24 24'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
    >
      <path d='M18 2H2v16H1V1h17v1zm4 4h1v17H6v-1h16V6zM6 6h12v12H6V6zm1 1v10h10V7H7z' />
    </svg>
  )
}

SvgOverlap.displayName = 'SvgOverlap'
export default withStyles(styles)(SvgOverlap)
