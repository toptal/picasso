import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType;
  color?: string;
  base?: number;
}
const SvgServices24 = forwardRef(function SvgServices24(
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
      <path d='M10 0c.88 0 1.717.19 2.47.53L9 4l.5 2.5L12 7l3.47-3.469a6 6 0 01-7.212 8.212L4 16l-4-4 4.257-4.256A6 6 0 0110 0zm0 1a5 5 0 00-4.862 6.171l.076.283.174.573L1.415 12 4 14.585l3.975-3.972.573.173A5 5 0 0015 6l-.007-.269-.024-.285-2.64 2.64L8.65 7.35 7.914 3.67l2.641-2.64-.02-.003a5.043 5.043 0 00-.266-.02L10 1z' />
    </svg>
  )
})

SvgServices24.displayName = 'SvgServices24'
export default withStyles(styles)(SvgServices24)
