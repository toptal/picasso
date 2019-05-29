import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgCandidates = (props: Props) => {
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
      <path d='M16 11H7v4l-7-4V1h16v10zm-1-9H1v8.42l5 2.857V10h9V2z' />
    </svg>
  )
}

SvgCandidates.displayName = 'SvgCandidates'
export default withStyles(styles)(SvgCandidates)
