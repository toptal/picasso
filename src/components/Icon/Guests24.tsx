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
const SvgGuests24 = forwardRef(function SvgGuests24(
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
        d='M7 1v1H5v21h14V2h-2V1h3v23H4V1h3zm8 17v1H9v-1h6zM12 6a3 3 0 0 1 1.777 5.418 3.995 3.995 0 0 1 2.217 3.37L16 15h-1a3 3 0 0 0-5.995-.176L9 15H8a4 4 0 0 1 2.223-3.585A3 3 0 0 1 12 6zm0 1a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm4-7v3H8V0h8zm-1 1H9v1h6V1z'
        fillRule='nonzero'
      />
    </svg>
  )
})

SvgGuests24.displayName = 'SvgGuests24'
export default withStyles(styles)(SvgGuests24)
