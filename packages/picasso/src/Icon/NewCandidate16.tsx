import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 16
type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgNewCandidate16 = forwardRef(function SvgNewCandidate16(
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
      viewBox='0 0 16 16'
      className={cx(...classes)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M13 3V1h1v2h2v1h-2v2h-1V4h-2V3h2zM3.873 9.388a4 4 0 114.255 0A6.002 6.002 0 0112 15h-1a5 5 0 00-10 0H0a6.002 6.002 0 013.873-5.612zM6 9a3 3 0 100-6 3 3 0 000 6z' />
    </svg>
  )
})
SvgNewCandidate16.displayName = 'SvgNewCandidate16'
export default withStyles(styles)(SvgNewCandidate16)
