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
const SvgCalendar16 = forwardRef(function SvgCalendar16(
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
      <defs>
        <path
          d='M3 2V1h1v1h8V1h1v1h3v13H0V2h3zm0 1H1v2h14V3h-2v1h-1V3H4v1H3V3zm12 3H1v8h14V6z'
          id='calendar16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='calendar16_svg__b'>
          <use xlinkHref='#calendar16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#calendar16_svg__a' />
        <g mask='url(#calendar16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgCalendar16.displayName = 'SvgCalendar16'
export default withStyles(styles)(SvgCalendar16)
