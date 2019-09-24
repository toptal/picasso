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
const SvgMorning24 = forwardRef(function SvgMorning24(
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
      <defs>
        <path
          d='M6.207 18a5.5 5.5 0 1 1 10.586 0h-1.05a4.5 4.5 0 1 0-8.488 0H6.208zM11 5h1v4h-1V5zm8.278 3.015l.707.707-2.828 2.828-.707-.707 2.828-2.828zM23 16v1h-4v-1h4zM0 17v-1h4v1H0zm3.015-8.278l.707-.707 2.828 2.828-.707.707-2.828-2.828z'
          id='morning24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='morning24_svg__b'>
          <use xlinkHref='#morning24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#morning24_svg__a' />
        <g mask='url(#morning24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgMorning24.displayName = 'SvgMorning24'
export default withStyles(styles)(SvgMorning24)
