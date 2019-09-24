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
const SvgSearch16 = forwardRef(function SvgSearch16(
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
          d='M10.582 9.874l4.625 4.626-.707.707-4.626-4.625a6 6 0 1 1 .707-.707zM6 11A5 5 0 1 0 6 1a5 5 0 0 0 0 10z'
          id='search16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='search16_svg__b'>
          <use xlinkHref='#search16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#search16_svg__a' />
        <g mask='url(#search16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgSearch16.displayName = 'SvgSearch16'
export default withStyles(styles)(SvgSearch16)
