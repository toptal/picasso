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
const SvgSpecializationArvr16 = forwardRef(function SvgSpecializationArvr16(
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
        className='specializationARVR16_svg__cls-1'
        d='M36.5 29.936H25.468a2.743 2.743 0 01-2.282-1.221l-1.873-2.81a1.578 1.578 0 00-2.626 0l-1.873 2.81a2.743 2.743 0 01-2.282 1.221H3.5a3 3 0 01-3-3v-10a3 3 0 013-3h33a3 3 0 013 3v10a3 3 0 01-3 3z'
      />
    </svg>
  )
})

SvgSpecializationArvr16.displayName = 'SvgSpecializationArvr16'
export default withStyles(styles)(SvgSpecializationArvr16)
