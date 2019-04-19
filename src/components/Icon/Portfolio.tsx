import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgPortfolio = (props: Props) => {
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
        <path d='M2.52 2.538v6.858h6.86V2.537H2.52zm-.312-.625h7.484c.172 0 .312.14.312.312v7.483c0 .173-.14.313-.312.313H2.208a.312.312 0 0 1-.312-.313V2.225c0-.173.14-.313.312-.313zM2.52 14.604v6.858h6.86v-6.858H2.52zm-.312-.625h7.484c.172 0 .312.14.312.313v7.483c0 .173-.14.313-.312.313H2.208a.312.312 0 0 1-.312-.313v-7.483c0-.173.14-.313.312-.313zM14.62 14.604v6.858h6.86v-6.858h-6.86zm-.312-.625h7.484c.172 0 .312.14.312.313v7.483c0 .173-.14.313-.312.313h-7.484a.312.312 0 0 1-.312-.313v-7.483c0-.173.14-.313.312-.313zM14.62 2.538v6.858h6.86V2.537h-6.86zm-.312-.625h7.484c.172 0 .312.14.312.312v7.483c0 .173-.14.313-.312.313h-7.484a.312.312 0 0 1-.312-.313V2.225c0-.173.14-.313.312-.313z' />
      </g>
    </svg>
  )
}

SvgPortfolio.displayName = 'SvgPortfolio'
export default withStyles(styles)(SvgPortfolio)
