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
const SvgUpdate16 = forwardRef(function SvgUpdate16(
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
      <path d='M3.5 12.753V14.5h-1v-4h4v1H3.816A5.435 5.435 0 008 13.455 5.455 5.455 0 0013.455 8h1.09A6.545 6.545 0 013.5 12.753zm9-9.506V1.5h1v4h-4v-1h2.684A5.435 5.435 0 008 2.545 5.455 5.455 0 002.545 8h-1.09A6.545 6.545 0 0112.5 3.247z' />
    </svg>
  )
})

SvgUpdate16.displayName = 'SvgUpdate16'
export default withStyles(styles)(SvgUpdate16)
