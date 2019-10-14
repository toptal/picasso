import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import { StandardProps, ColorType } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: ColorType | string
  base?: number
}
const SvgReferralBonus16 = forwardRef(function SvgReferralBonus16(
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
  let svgColor
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const colorClassName = kebabToCamelCase(`${color}`)

  if (!availableClasses[`${colorClassName}`]) {
    svgColor = color
  } else {
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
      color={svgColor}
      ref={ref}
    >
      <path d='M9 14.5H7V16H6v-1.606c-1.472-.302-2.75-1.232-3.443-2.563l-.231-.443.886-.462.231.443c.52.998 1.46 1.717 2.557 1.999v-4.87a3.688 3.688 0 0 1-2.431-1.016A3.44 3.44 0 0 1 2.5 5c0-1.897 1.56-3.434 3.5-3.498V0h1v1.5h2V0h1v1.606c1.472.302 2.75 1.232 3.443 2.563l.231.443-.886.462-.231-.443c-.52-.998-1.46-1.717-2.557-1.999v4.87c1.94.064 3.5 1.6 3.5 3.498 0 1.897-1.56 3.434-3.5 3.498V16H9v-1.5zm0-7v-5H7v5h2zm0 6v-5H7v5h2zm1-.003c1.396-.062 2.5-1.16 2.5-2.497 0-1.336-1.104-2.435-2.5-2.497v4.994zM6 2.503C4.604 2.565 3.5 3.663 3.5 5c0 .659.273 1.292.762 1.76A2.687 2.687 0 0 0 6 7.498V2.503z' />
    </svg>
  )
})

SvgReferralBonus16.displayName = 'SvgReferralBonus16'
export default withStyles(styles)(SvgReferralBonus16)
