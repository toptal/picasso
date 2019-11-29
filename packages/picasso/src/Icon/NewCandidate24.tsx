import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgNewCandidate24 = forwardRef(function SvgNewCandidate24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    classes: availableClasses,
    className,
    style = {},
    color,
    scale,
    base
  } = props
  const classes = [availableClasses.root, className]
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const colorClassName = kebabToCamelCase(`${color}`)

  if (availableClasses[colorClassName]) {
    classes.push(availableClasses[colorClassName])
  }

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style
  }

  return (
    <svg
      viewBox='0 0 24 24'
      className={cx(...classes)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M20 4V1h1v3h3v1h-3v3h-1V5h-3V4h3zM6.235 14.433A7.002 7.002 0 0 1 9 1a7 7 0 0 1 2.765 13.433A9.004 9.004 0 0 1 18 23h-1a8 8 0 1 0-16 0H0c0-4.006 2.617-7.4 6.235-8.567zM9 14A6 6 0 1 0 9 2a6 6 0 0 0 0 12z' />
    </svg>
  )
})

SvgNewCandidate24.displayName = 'SvgNewCandidate24'
export default withStyles(styles)(SvgNewCandidate24)
