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
const SvgPencil16 = forwardRef(function SvgPencil16(
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
          d='M11.5.793L15.207 4.5 4.707 15H1v-3.707L8.793 3.5V3.5l.707-.707 2-2zm-2 3.415l-7.5 7.5V14h2.293l7.499-7.5L9.5 4.208zm2-2L10.207 3.5l2.292 2.293L13.793 4.5 11.5 2.207z'
          id='pencil16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='pencil16_svg__b'>
          <use xlinkHref='#pencil16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#pencil16_svg__a' />
        <g mask='url(#pencil16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgPencil16.displayName = 'SvgPencil16'
export default withStyles(styles)(SvgPencil16)
