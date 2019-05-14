import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgRotate = (props: Props) => {
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
        <path d='M2.444 13.622V8.29h-.888v6.222h11.982v-.889zM12.632 8.289h.89V2.956H2.461v.888h10.17z' />
        <path d='M10.922 15.791l.617.64 2.64-2.542-2.64-2.542-.617.64 1.976 1.902zM4.616 1.32L3.999.68 1.36 3.222 4 5.765l.617-.64-1.975-1.903z' />
      </g>
    </svg>
  )
}

SvgRotate.displayName = 'SvgRotate'
export default withStyles(styles)(SvgRotate)
