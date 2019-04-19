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
      viewBox='0 0 20 24'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
    >
      <g fillRule='nonzero'>
        <path d='M2.171 11.5c0-4.28 3.506-7.75 7.829-7.75s7.829 3.47 7.829 7.75v6.094c0 .638.524 1.156 1.171 1.156v.5H1v-.5c.647 0 1.171-.518 1.171-1.156V11.5zM19 18.75c.333 0 .333.5 0 .5-.469 0-.893-.191-1.196-.5H19zm-1.671-1.156V11.5c0-4.003-3.28-7.25-7.329-7.25-4.048 0-7.329 3.247-7.329 7.25v6.094c0 .45-.18.858-.475 1.156h15.608a1.643 1.643 0 0 1-.475-1.156zM1 19.25c-.333 0-.333-.5 0-.5h1.196c-.303.309-.727.5-1.196.5z' />
        <path d='M9.75 1v3a.25.25 0 1 0 .5 0V1a.25.25 0 1 0-.5 0zM11.753 20.96c-.174 1.05-.914 1.79-1.753 1.79-.839 0-1.579-.74-1.753-1.79a.25.25 0 1 0-.494.08c.212 1.278 1.145 2.21 2.247 2.21 1.102 0 2.035-.932 2.247-2.21a.25.25 0 1 0-.494-.08z' />
      </g>
    </svg>
  )
}

SvgAlarm.displayName = 'SvgAlarm'
export default withStyles(styles)(SvgAlarm)
