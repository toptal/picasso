import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgTrash = (props: Props) => {
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
      <g fillRule='nonzero'>
        <path d='M6.394.693h4.212a.333.333 0 1 0 0-.666H6.394a.333.333 0 1 0 0 .666zM7.26 12.307V6.36a.333.333 0 1 0-.666 0v5.947a.333.333 0 0 0 .666 0zM10.406 12.307V6.36a.333.333 0 1 0-.666 0v5.947a.333.333 0 0 0 .666 0zM2.494 3.36h12.012a.333.333 0 0 0 0-.667H2.494a.333.333 0 0 0 0 .667z' />
        <path d='M12.873 15.307H4.127V3.027a.333.333 0 1 0-.666 0V15.64c0 .184.149.333.333.333h9.412c.184 0 .333-.149.333-.333V3.027a.333.333 0 1 0-.666 0v12.28z' />
      </g>
    </svg>
  )
}

SvgTrash.displayName = 'SvgTrash'
export default withStyles(styles)(SvgTrash)
