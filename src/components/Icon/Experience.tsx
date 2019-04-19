import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgExperience = (props: Props) => {
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
        <path d='M9.208 23.038c-.172 0-.312-.168-.312-.375 0-.208.14-.375.312-.375h13.417c.173 0 .313.167.313.375 0 .207-.14.375-.313.375H9.208zM9.52 19.404h12.793v-6.117H9.52v6.117zm-.312-6.742h13.417c.173 0 .313.14.313.313v6.742c0 .172-.14.312-.313.312H9.208a.312.312 0 0 1-.312-.312v-6.742c0-.173.14-.313.312-.313zM18.058 10.162c.173 0 .313.168.313.375 0 .208-.14.375-.313.375h-4.283c-.173 0-.313-.167-.313-.375 0-.207.14-.375.313-.375h4.283zM11 5.037a.312.312 0 1 1 0-.625h5.458c.173 0 .313.14.313.313v3.25a.312.312 0 1 1-.625 0V5.037H11zM3.354 14.046h3.354a.312.312 0 1 1 0 .625H3.042a.312.312 0 0 1-.313-.313V4.725c0-.173.14-.313.313-.313H8.5a.313.313 0 0 1 0 .625H3.354v9.009z' />
        <path d='M8.813 3.37v2.71h1.874V3.37H8.813zM8.5 2.747H11c.173 0 .313.14.313.312v3.334c0 .172-.14.312-.313.312H8.5a.313.313 0 0 1-.313-.312V3.058c0-.172.14-.312.313-.312z' />
      </g>
    </svg>
  )
}

SvgExperience.displayName = 'SvgExperience'
export default withStyles(styles)(SvgExperience)
