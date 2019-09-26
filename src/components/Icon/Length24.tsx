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
const SvgLength24 = forwardRef(function SvgLength24(
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
          d='M1 2v20H0V2h1zm23 0v20h-1V2h1zm-7.5 4.29l5 5 .707.707-.707.707-5 5-.707-.707 4.999-5-5-5 .708-.707zm-9 0l.707.707-5 5 5 5-.707.707-5.707-5.707.707-.707 5-5z'
          id='length24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='length24_svg__b'>
          <use xlinkHref='#length24_svg__a' />
        </mask>
        <use xlinkHref='#length24_svg__a' />
        <g mask='url(#length24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgLength24.displayName = 'SvgLength24'
export default withStyles(styles)(SvgLength24)
