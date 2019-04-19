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
      viewBox='0 0 24 24'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
    >
      <g fillRule='nonzero'>
        <path d='M4.375 4.375H16.53a.375.375 0 1 0 0-.75H4A.375.375 0 0 0 3.625 4v15.15c0 .207.168.375.375.375h7.56a.375.375 0 1 0 0-.75H4.375v-14.4z' />
        <path d='M13.95 9.185H6.59a.375.375 0 0 0 0 .75h7.36a.375.375 0 1 0 0-.75zM10.26 12.375H6.59a.375.375 0 1 0 0 .75h3.67a.375.375 0 1 0 0-.75zM14.475 16.535a.375.375 0 1 0-.53.53l2.39 2.39a.375.375 0 0 0 .53 0l2.4-2.39a.375.375 0 1 0-.53-.53l-2.134 2.125-2.126-2.125z' />
        <path d='M16.975 19.19V9.56a.375.375 0 1 0-.75 0v9.63a.375.375 0 1 0 .75 0z' />
      </g>
    </svg>
  )
}

SvgUpload.displayName = 'SvgUpload'
export default withStyles(styles)(SvgUpload)
