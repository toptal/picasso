import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import { StandardProps, ColorType } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: ColorType | string
  base?: number
}
const SvgKrOwnershipPending24 = forwardRef(function SvgKrOwnershipPending24(
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
      viewBox='0 0 24 24'
      className={cx(...classes)}
      style={svgStyle}
      color={svgColor}
      ref={ref}
    >
      <path
        d='M11.9 12c-1.8 0-3.3-1.5-3.3-3.3 0-1.8 1.5-3.3 3.3-3.3 1.8 0 3.3 1.5 3.3 3.3 0 1.9-1.5 3.3-3.3 3.3zm.1 11.5C5.6 23.5.5 18.4.5 12 .5 5.7 5.6.5 12 .5 18.3.5 23.5 5.6 23.5 12S18.3 23.5 12 23.5zm-5.8-5.2c0-2.2 1.2-4.2 3.2-5.1 1.6-.9 3.6-.9 5.4 0 2 1 3.2 3.1 3.2 5.1'
        fillRule='evenodd'
      />
    </svg>
  )
})

SvgKrOwnershipPending24.displayName = 'SvgKrOwnershipPending24'
export default withStyles(styles)(SvgKrOwnershipPending24)
