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
const SvgSpecializationRpa24 = forwardRef(function SvgSpecializationRpa24(
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
      <path
        className='specializationRPA24_svg__cls-1'
        d='M39.5 20v-2.993l-3.55-1.014a16.342 16.342 0 00-1.838-4.437l1.793-3.228-4.233-4.233-3.228 1.793a16.336 16.336 0 00-4.437-1.838L22.993.5h-5.986l-1.015 3.55a16.335 16.335 0 00-4.436 1.839L8.328 4.095 4.095 8.328l1.793 3.228a16.333 16.333 0 00-1.838 4.437L.5 17.007V20M9.275 20a10.725 10.725 0 0121.45 0'
      />
    </svg>
  )
})

SvgSpecializationRpa24.displayName = 'SvgSpecializationRpa24'
export default withStyles(styles)(SvgSpecializationRpa24)
