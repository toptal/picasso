import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgReferrals = (props: Props) => {
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
      <path d='M14.5 6.793l.707.707L8.5 14.207l-.707-.707 6-6-6-6L8.5.793l6 6zm-7 0l.707.707L1.5 14.207.793 13.5l6-6-6-6L1.5.793l6 6z' />
    </svg>
  )
}

SvgReferrals.displayName = 'SvgReferrals'
export default withStyles(styles)(SvgReferrals)
