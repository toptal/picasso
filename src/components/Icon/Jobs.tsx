import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgJobs = (props: Props) => {
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
      <path d='M10 5H1v4h14V5h-5zM6 4V2h4v2h6v11H0V4h6zm1 0h2V3H7v1zm8 6H1v4h14v-4z' />
    </svg>
  )
}

SvgJobs.displayName = 'SvgJobs'
export default withStyles(styles)(SvgJobs)
