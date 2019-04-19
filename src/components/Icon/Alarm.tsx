import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgAlarm = (props: Props) => {
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
        <path d='M3.5 11.5a8.5 8.5 0 0 1 17 0V18a1 1 0 0 0 1 1v1h-19v-1a1 1 0 0 0 1-1v-6.5zm18 7.5c.667 0 .667 1 0 1a2 2 0 0 1-1.732-1H21.5zm-2-1v-6.5a7.5 7.5 0 0 0-15 0V18c0 .364-.097.706-.268 1h15.536a1.99 1.99 0 0 1-.268-1zm-17 2c-.667 0-.667-1 0-1h1.732A2 2 0 0 1 2.5 20z' />
        <path d='M11.5.501v3a.5.5 0 0 0 1 0v-3a.5.5 0 1 0-1 0zM13.96 21.4a2 2 0 0 1-3.92 0 .5.5 0 0 0-.98.2 3 3 0 0 0 5.88 0 .5.5 0 1 0-.98-.2z' />
      </g>
    </svg>
  )
}

SvgAlarm.displayName = 'SvgAlarm'
export default withStyles(styles)(SvgAlarm)
