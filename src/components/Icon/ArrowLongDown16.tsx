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
const SvgArrowLongDown16 = forwardRef(function SvgArrowLongDown16(
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
          d='M8 2v10.293l2.5-2.5.707.707L7.5 14.207 3.793 10.5l.707-.707 2.5 2.5V2h1z'
          id='arrowLongDown16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='arrowLongDown16_svg__b'>
          <use xlinkHref='#arrowLongDown16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#arrowLongDown16_svg__a' />
        <g mask='url(#arrowLongDown16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgArrowLongDown16.displayName = 'SvgArrowLongDown16'
export default withStyles(styles)(SvgArrowLongDown16)
