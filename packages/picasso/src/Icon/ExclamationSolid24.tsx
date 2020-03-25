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
const SvgExclamationSolid24 = forwardRef(function SvgExclamationSolid24(
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
      <circle id='path-1' cx='8' cy='8' r='8' />
      <path
        d='M8,11 C8.55228475,11 9,11.4477153 9,12 C9,12.5522847 8.55228475,13 8,13 C7.44771525,13 7,12.5522847 7,12 C7,11.4477153 7.44771525,11 8,11 Z M8,3 C8.55228475,3 9,3.44771525 9,4 L9,9 C9,9.55228475 8.55228475,10 8,10 C7.44771525,10 7,9.55228475 7,9 L7,4 C7,3.44771525 7.44771525,3 8,3 Z'
        fill='#FFFFFF'
      />
    </svg>
  )
})
SvgExclamationSolid24.displayName = 'SvgExclamationSolid24'
export default withStyles(styles)(SvgExclamationSolid24)
