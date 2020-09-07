import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType;
  color?: string;
  base?: number;
}
const SvgSpecializationDevOps16 = forwardRef(function SvgSpecializationDevOps16(
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
      <path
        className='specializationDevOps16_svg__cls-1'
        d='M21.253 23.76l2.685 2.685a9.115 9.115 0 100-12.89l-2.124 2.125L20 17.493 17.493 20l-.871.871-3.067 3.068a5.57 5.57 0 110-7.877l2.685 2.685'
      />
    </svg>
  )
})

SvgSpecializationDevOps16.displayName = 'SvgSpecializationDevOps16'
export default withStyles(styles)(SvgSpecializationDevOps16)
