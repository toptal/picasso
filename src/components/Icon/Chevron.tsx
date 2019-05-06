import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgChevron = (props: Props) => {
  const { classes, className, style, size, color } = props
  const svgStyle = {
    fontSize: size && `${size}rem`,
    ...style
  }

  return (
    <svg
      {...props}
      viewBox='0 0 7 13'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
    >
      <path d='M7 6.5a.43.43 0 0 1-.12.3l-5.604 6.07a.367.367 0 0 1-.277.13.367.367 0 0 1-.277-.13l-.601-.652a.43.43 0 0 1-.121-.3.43.43 0 0 1 .12-.3L4.848 6.5.12 1.381a.43.43 0 0 1-.121-.3.43.43 0 0 1 .12-.3l.602-.65A.368.368 0 0 1 .999 0c.104 0 .196.044.277.13L6.879 6.2A.43.43 0 0 1 7 6.5z' />
    </svg>
  )
}

SvgChevron.displayName = 'SvgChevron'
export default withStyles(styles)(SvgChevron)
