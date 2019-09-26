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
const SvgNight24 = forwardRef(function SvgNight24(
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
          d='M20 13v-1h1v1h1v1h-1v1h-1v-1h-1v-1h1zm-2-7V4h1v2h2v1h-2v2h-1V7h-2V6h2zM9 9a9 9 0 0 0 8.712 8.995 9 9 0 1 1-6.425-14.991A8.966 8.966 0 0 0 9 9zm-6 3a8 8 0 0 0 12.426 6.666C11.143 17.529 8 13.624 8 9c0-1.709.43-3.352 1.227-4.803A8.003 8.003 0 0 0 3 12z'
          id='night24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='night24_svg__b'>
          <use xlinkHref='#night24_svg__a' />
        </mask>
        <use xlinkHref='#night24_svg__a' />
        <g mask='url(#night24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgNight24.displayName = 'SvgNight24'
export default withStyles(styles)(SvgNight24)
