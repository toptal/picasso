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
const SvgAfternoon24 = forwardRef(function SvgAfternoon24(
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
      <path d='M11.5 17a5.5 5.5 0 110-11 5.5 5.5 0 010 11zm0-1a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM11 0h1v4h-1V0zm8.278 3.015l.707.707-2.828 2.828-.707-.707 2.828-2.828zM23 11v1h-4v-1h4zm-3.015 8.278l-.707.707-2.828-2.828.707-.707 2.828 2.828zM12 23h-1v-4h1v4zm-8.278-3.015l-.707-.707 2.828-2.828.707.707-2.828 2.828zM0 12v-1h4v1H0zm3.015-8.278l.707-.707L6.55 5.843l-.707.707-2.828-2.828z' />
    </svg>
  )
})

SvgAfternoon24.displayName = 'SvgAfternoon24'
export default withStyles(styles)(SvgAfternoon24)
