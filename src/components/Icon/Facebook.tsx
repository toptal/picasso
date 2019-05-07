import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgFacebook = (props: Props) => {
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
      <path
        d='M12.59 0h-2c-2 0-4 1-4 4v2h-2v3h2v7h3V9h3V6h-3V4l2-1h1V0z'
        fillRule='evenodd'
      />
    </svg>
  )
}

SvgFacebook.displayName = 'SvgFacebook'
export default withStyles(styles)(SvgFacebook)
