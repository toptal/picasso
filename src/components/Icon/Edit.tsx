import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgEdit = (props: Props) => {
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
      <path
        d='M.75 12.014V15c0 .138.112.25.25.25h2.986l.176-.073L15.177 4.162a.25.25 0 0 0 0-.353L12.19.823a.25.25 0 0 0-.353 0L.823 11.838l-.073.176zm.5.104L12.014 1.354l2.632 2.632L3.882 14.75H1.25v-2.632z'
        fillRule='nonzero'
      />
    </svg>
  )
}

SvgEdit.displayName = 'SvgEdit'
export default withStyles(styles)(SvgEdit)
