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
const SvgExclamation16 = forwardRef(function SvgExclamation16(
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
          d='M7.5 15a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15zm0-1a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM7 3h1v6H7V3zm0 8h1v1H7v-1z'
          id='exclamation16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='exclamation16_svg__b'>
          <use xlinkHref='#exclamation16_svg__a' />
        </mask>
        <use xlinkHref='#exclamation16_svg__a' />
        <g mask='url(#exclamation16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgExclamation16.displayName = 'SvgExclamation16'
export default withStyles(styles)(SvgExclamation16)
