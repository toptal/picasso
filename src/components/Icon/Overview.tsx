import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgOverview = (props: Props) => {
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
      <path d='M0 13h16v1H0v-1zm0-5h16v1H0V8zm0-5h16v1H0V3z' />
    </svg>
  )
}

SvgOverview.displayName = 'SvgOverview'
export default withStyles(styles)(SvgOverview)
