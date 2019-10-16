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
const SvgKrOwnership16 = forwardRef(function SvgKrOwnership16(
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
        d='M12 23.5C5.7 23.5.5 18.3.5 12S5.7.5 12 .5 23.5 5.7 23.5 12c0 6.4-5.2 11.5-11.5 11.5zm-5.8-5.2c0-2.1 1.2-4.1 3.2-5.2 1.7-.9 3.7-.9 5.4 0 2 .9 3.2 3.1 3.2 5.2m-6-6c-1.8 0-3.2-1.5-3.2-3.2 0-1.8 1.5-3.2 3.2-3.2 1.8 0 3.2 1.5 3.2 3.2 0 1.7-1.4 3.2-3.2 3.2z'
        fillRule='evenodd'
      />
    </svg>
  )
})

SvgKrOwnership16.displayName = 'SvgKrOwnership16'
export default withStyles(styles)(SvgKrOwnership16)
