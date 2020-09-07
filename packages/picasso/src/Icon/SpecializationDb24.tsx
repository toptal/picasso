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
const SvgSpecializationDb24 = forwardRef(function SvgSpecializationDb24(
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
        className='specializationDB24_svg__cls-1'
        d='M38.934 16.613A1.666 1.666 0 0139 17c0 2.838-7.803 6-19 6S1 19.838 1 17a1.666 1.666 0 01.066-.388 7.425 7.425 0 01-.792-.72A2.68 2.68 0 000 17v6c0 3.866 8.954 7 20 7s20-3.134 20-7v-6a2.68 2.68 0 00-.274-1.108 7.425 7.425 0 01-.791.72zM39 23c0 2.838-7.803 6-19 6S1 25.838 1 23v-3.822C3.618 21.977 11.129 24 20 24s16.382-2.023 19-4.822z'
      />
    </svg>
  )
})

SvgSpecializationDb24.displayName = 'SvgSpecializationDb24'
export default withStyles(styles)(SvgSpecializationDb24)
