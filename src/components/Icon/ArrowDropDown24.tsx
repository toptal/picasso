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
const SvgArrowDropDown24 = forwardRef(function SvgArrowDropDown24(
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
          d='M11.372 16.215l-6.744-8.43C4.285 7.355 4.448 7 5 7h13.998c.556 0 .72.351.373.785l-6.744 8.43c-.343.43-.91.434-1.256 0z'
          id='arrowDropDown24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='arrowDropDown24_svg__b'>
          <use xlinkHref='#arrowDropDown24_svg__a' />
        </mask>
        <use xlinkHref='#arrowDropDown24_svg__a' />
        <g mask='url(#arrowDropDown24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgArrowDropDown24.displayName = 'SvgArrowDropDown24'
export default withStyles(styles)(SvgArrowDropDown24)
