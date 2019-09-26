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
const SvgClose24 = forwardRef(function SvgClose24(
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
          d='M12.707 12l8.5 8.5-.707.707-8.5-8.5-8.5 8.5-.707-.707 8.5-8.5-8.5-8.5.707-.707 8.5 8.5 8.5-8.5.707.707-8.5 8.5z'
          id='close24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='close24_svg__b'>
          <use xlinkHref='#close24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#close24_svg__a' />
        <g mask='url(#close24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgClose24.displayName = 'SvgClose24'
export default withStyles(styles)(SvgClose24)
