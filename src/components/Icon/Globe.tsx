import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgGlobe = (props: Props) => {
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
        <path d='M7.98 16c4.375 0 7.92-3.582 7.92-8s-3.545-8-7.92-8S.06 3.582.06 8s3.545 8 7.92 8zm0-.5C3.883 15.5.56 12.143.56 8S3.883.5 7.98.5C12.077.5 15.4 3.857 15.4 8s-3.323 7.5-7.42 7.5z' />
        <path d='M7.98 16c2.301 0 4.08-3.6 4.08-8s-1.779-8-4.08-8S3.9 3.6 3.9 8s1.779 8 4.08 8zm0-.5C6.05 15.5 4.4 12.16 4.4 8S6.05.5 7.98.5c1.93 0 3.58 3.34 3.58 7.5s-1.65 7.5-3.58 7.5z' />
        <path d='M.32 8.25h15.33a.25.25 0 1 0 0-.5H.32a.25.25 0 1 0 0 .5z' />
      </g>
    </svg>
  )
}

SvgGlobe.displayName = 'SvgGlobe'
export default withStyles(styles)(SvgGlobe)
