import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgSearch = (props: Props) => {
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
      <path d='M10.582 9.874l4.625 4.626-.707.707-4.626-4.625a6 6 0 1 1 .707-.707zM6 11A5 5 0 1 0 6 1a5 5 0 0 0 0 10z' />
    </svg>
  )
}

SvgSearch.displayName = 'SvgSearch'
export default withStyles(styles)(SvgSearch)
