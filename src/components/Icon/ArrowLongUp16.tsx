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
const SvgArrowLongUp16 = forwardRef(function SvgArrowLongUp16(
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
          d='M7.5 1.793L11.207 5.5l-.707.707-2.5-2.5V14H7V3.707l-2.5 2.5-.707-.707 3-3 .707-.707z'
          id='arrowLongUp16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='arrowLongUp16_svg__b'>
          <use xlinkHref='#arrowLongUp16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#arrowLongUp16_svg__a' />
        <g mask='url(#arrowLongUp16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgArrowLongUp16.displayName = 'SvgArrowLongUp16'
export default withStyles(styles)(SvgArrowLongUp16)
