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
const SvgKrOwnershipPending16 = forwardRef(function SvgKrOwnershipPending16(
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
      <path
        d='M7.9 8c-1.1 0-2.1-.9-2.1-2.1 0-1.2.9-2.1 2.1-2.1 1.2 0 2.1.9 2.1 2.1.1 1.2-.9 2.1-2.1 2.1zm.1 7.5C3.9 15.5.5 12.2.5 8 .5 3.9 3.8.5 8 .5c4.1 0 7.5 3.3 7.5 7.5 0 4.1-3.4 7.5-7.5 7.5zm-3.8-3.4c0-1.4.8-2.7 2.1-3.3 1.1-.6 2.4-.6 3.5 0 1.3.6 2.1 2 2.1 3.3'
        fillRule='evenodd'
      />
    </svg>
  )
})

SvgKrOwnershipPending16.displayName = 'SvgKrOwnershipPending16'
export default withStyles(styles)(SvgKrOwnershipPending16)
