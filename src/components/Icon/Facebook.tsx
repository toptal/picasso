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
        d='M8.49 15.95V8h2.48l.39-2.64H8.5V4.03c0-.7.2-1.35 1.14-1.35h1.86V.05H8.85c-2.22 0-2.83 1.55-2.83 3.7v1.6H4.5v2.64h1.53v7.96H8.5z'
        fillRule='evenodd'
      />
    </svg>
  )
}

SvgFacebook.displayName = 'SvgFacebook'
export default withStyles(styles)(SvgFacebook)
