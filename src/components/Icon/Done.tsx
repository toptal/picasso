import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgDone = (props: Props) => {
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
        <path d='M11 14.146l-2.823-2.823-.354.354L11 14.854l5.677-5.677-.354-.354z' />
        <path d='M12 21.25a9.25 9.25 0 1 0 0-18.5 9.25 9.25 0 0 0 0 18.5zm0-.5a8.75 8.75 0 1 1 0-17.5 8.75 8.75 0 0 1 0 17.5z' />
      </g>
    </svg>
  )
}

SvgDone.displayName = 'SvgDone'
export default withStyles(styles)(SvgDone)
