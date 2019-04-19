import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgExclamation = (props: Props) => {
  const { classes, className, style, size, color } = props
  const svgStyle = {
    fontSize: size ? `${size}rem` : 'inherit',
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
        <path d='M12.25 14V7a1 1 0 1 0-2 0v7a1 1 0 0 0 2 0zM11.246 16h-.01a1 1 0 0 0 .01 2h.004c-.428-.014-.743-.33-.755-.724a.75.75 0 0 1 .739-.776.751.751 0 0 1 .766.72.752.752 0 0 1-.743.78 1 1 0 0 0 .012-2h-.023zm-.01 0h-.01A1.245 1.245 0 0 0 10 17.296 1.253 1.253 0 0 0 11.25 18.5a1.246 1.246 0 0 0 1.244-1.292 1.252 1.252 0 0 0-1.209-1.207h-.016a1.015 1.015 0 0 0-.034-.001z' />
      </g>
    </svg>
  )
}

SvgExclamation.displayName = 'SvgExclamation'
export default withStyles(styles)(SvgExclamation)
