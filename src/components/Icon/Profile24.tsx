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
const SvgProfile24 = forwardRef(function SvgProfile24(
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
          d='M9.235 14.433A7.002 7.002 0 0 1 12 1a7 7 0 0 1 2.765 13.433A9.004 9.004 0 0 1 21 23h-1a8 8 0 1 0-16 0H3c0-4.006 2.617-7.4 6.235-8.567zM12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12z'
          id='profile24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='profile24_svg__b'>
          <use xlinkHref='#profile24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#profile24_svg__a' />
        <g mask='url(#profile24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgProfile24.displayName = 'SvgProfile24'
export default withStyles(styles)(SvgProfile24)
