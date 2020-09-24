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
const SvgProfileCrossed24 = forwardRef(function SvgProfileCrossed24(
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
      <path d='M18.951 7.17a7.002 7.002 0 01-4.189 7.263 9.001 9.001 0 016.234 8.288L21 23h-1a8 8 0 00-8.933-7.946l1.057-1.057.1-.001A6 6 0 0018 8.124l.952-.953zM4.054 22.069a8.063 8.063 0 00-.05.683L4 23h-.878l.932-.932zM21.5 1.793l.707.707L2.5 22.207l-.707-.707L21.5 1.793zM12 1a6.993 6.993 0 015.8 3.08l-.722.722a6 6 0 10-8.275 8.276l-.722.722A7 7 0 0112 1z' />
    </svg>
  )
})

SvgProfileCrossed24.displayName = 'SvgProfileCrossed24'
export default withStyles(styles)(SvgProfileCrossed24)
