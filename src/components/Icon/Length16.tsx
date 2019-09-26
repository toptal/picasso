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
const SvgLength16 = forwardRef(function SvgLength16(
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
          d='M1 1v14H0V1h1zm15 0v14h-1V1h1zm-5.5 3.29l3 3 .707.707-3.707 3.707-.707-.707 2.999-3-3-3 .708-.707zm-5 0l.707.707-3 3 3 3-.707.707-3.707-3.707.707-.707 3-3z'
          id='length16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='length16_svg__b'>
          <use xlinkHref='#length16_svg__a' />
        </mask>
        <use xlinkHref='#length16_svg__a' />
        <g mask='url(#length16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgLength16.displayName = 'SvgLength16'
export default withStyles(styles)(SvgLength16)
