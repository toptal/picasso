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
        <path d='M11 13.586l-3.293-3.293-1.414 1.414L11 16.414l6.707-6.707-1.414-1.414z' />
        <path
          d='M24 12c0 6.645-5.355 12-12 12S0 18.645 0 12 5.355 0 12 0s12 5.355 12 12zm-.5 0C23.5 5.63 18.37.5 12 .5S.5 5.63.5 12 5.63 23.5 12 23.5 23.5 18.37 23.5 12z'
          fillOpacity={0.6}
        />
      </g>
    </svg>
  )
}

SvgDone.displayName = 'SvgDone'
export default withStyles(styles)(SvgDone)
