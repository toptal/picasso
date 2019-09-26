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
const SvgChevronRight24 = forwardRef(function SvgChevronRight24(
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
          d='M15.5 10.793l.707.707L9.5 18.207l-.707-.707 6-6-6-6 .707-.707 6 6z'
          id='chevronRight24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='chevronRight24_svg__b'>
          <use xlinkHref='#chevronRight24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#chevronRight24_svg__a' />
        <g mask='url(#chevronRight24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgChevronRight24.displayName = 'SvgChevronRight24'
export default withStyles(styles)(SvgChevronRight24)
