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
        <path d='M1.958 2.225a.25.25 0 0 1 .25-.25h7.484a.25.25 0 0 1 .25.25v7.483a.25.25 0 0 1-.25.25H2.208a.25.25 0 0 1-.25-.25V2.225zm.5.25v6.983h6.984V2.475H2.458zM1.958 14.292a.25.25 0 0 1 .25-.25h7.484a.25.25 0 0 1 .25.25v7.483a.25.25 0 0 1-.25.25H2.208a.25.25 0 0 1-.25-.25v-7.483zm.5 7.233h6.984v-6.983H2.458v6.983zM14.058 14.292a.25.25 0 0 1 .25-.25h7.484a.25.25 0 0 1 .25.25v7.483a.25.25 0 0 1-.25.25h-7.484a.25.25 0 0 1-.25-.25v-7.483zm.5 7.233h6.984v-6.983h-6.984v6.983zM14.058 2.225a.25.25 0 0 1 .25-.25h7.484a.25.25 0 0 1 .25.25v7.483a.25.25 0 0 1-.25.25h-7.484a.25.25 0 0 1-.25-.25V2.225zm.5.25v6.983h6.984V2.475h-6.984z' />
      </g>
    </svg>
  )
}

SvgPortfolio.displayName = 'SvgPortfolio'
export default withStyles(styles)(SvgPortfolio)
