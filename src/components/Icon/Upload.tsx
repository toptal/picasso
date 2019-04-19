import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgUpload = (props: Props) => {
  const { classes, className, style, size, color } = props
  const svgStyle = {
    fontSize: size && `${size}rem`,
    ...style
  }

  return (
    <svg
      {...props}
      viewBox='0 0 16 16'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
    >
      <g fillRule='nonzero'>
        <path d='M.474 14.785V.475h11.782V7.67a.237.237 0 1 0 .474 0V.237A.237.237 0 0 0 12.493 0H.237A.237.237 0 0 0 0 .237v14.785c0 .13.106.237.237.237h7.39a.237.237 0 1 0 0-.474H.473z' />
        <path d='M9.965 4.456h-7.2c-.13 0-.237.12-.237.267 0 .147.107.267.237.267h7.2c.13 0 .237-.12.237-.267 0-.147-.106-.267-.237-.267zM9.965 6.985h-7.2c-.13 0-.237.12-.237.266 0 .148.107.267.237.267h7.2c.13 0 .237-.12.237-.267 0-.147-.106-.266-.237-.266zM6.362 9.513H2.765c-.13 0-.237.12-.237.267 0 .147.107.266.237.266h3.597c.131 0 .237-.119.237-.266 0-.148-.106-.267-.237-.267zM10.392 12.56a.237.237 0 0 0-.335.335l2.338 2.339a.237.237 0 0 0 .335 0l2.345-2.339a.237.237 0 1 0-.334-.336l-2.178 2.172-2.171-2.171z' />
        <path d='M12.86 15.066v-4.95c0-.13-.12-.236-.267-.236-.148 0-.267.106-.267.237v4.95c0 .13.12.236.267.236.147 0 .266-.106.266-.237z' />
      </g>
    </svg>
  )
}

SvgUpload.displayName = 'SvgUpload'
export default withStyles(styles)(SvgUpload)
