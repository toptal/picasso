import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
interface Props extends StandardProps {
  size?: number
  color?: string
}

const SvgCerificate = (props: Props) => {
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
        <path d='M4.009 19.787h7.314a.278.278 0 1 1 0 .555H3.73a.278.278 0 0 1-.278-.277V3.667c0-.154.125-.278.278-.278h12.296c.153 0 .278.124.278.278v1.419a.278.278 0 1 1-.556 0V3.944H4.01v15.843z' />
        <path d='M16.032 16.235a4.383 4.383 0 0 1-4.38-4.386 4.383 4.383 0 0 1 4.38-4.385 4.383 4.383 0 0 1 4.38 4.385 4.383 4.383 0 0 1-4.38 4.386zm0-.556a3.827 3.827 0 0 0 3.825-3.83 3.827 3.827 0 0 0-3.825-3.83 3.827 3.827 0 0 0-3.824 3.83 3.827 3.827 0 0 0 3.824 3.83z' />
        <path d='M17.803 15.409a.278.278 0 1 1 .555 0v4.656c0 .209-.222.343-.407.245l-1.919-1.012-1.924 1.012a.278.278 0 0 1-.407-.245v-4.656a.278.278 0 1 1 .555 0v4.195l1.647-.866a.278.278 0 0 1 .259 0l1.64.866v-4.195z' />
      </g>
    </svg>
  )
}

SvgCerificate.displayName = 'SvgCerificate'
export default withStyles(styles)(SvgCerificate)
