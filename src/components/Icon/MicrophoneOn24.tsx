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
const SvgMicrophoneOn24 = forwardRef(function SvgMicrophoneOn24(
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
          d='M11 23v-3.016A7.5 7.5 0 0 1 4 12.5h1a6.5 6.5 0 1 0 13 0h1a7.5 7.5 0 0 1-7 7.484V23h5v1H6v-1h5zm.5-23A4.5 4.5 0 0 1 16 4.5v8a4.5 4.5 0 1 1-9 0v-8A4.5 4.5 0 0 1 11.5 0zm0 1A3.5 3.5 0 0 0 8 4.5v8a3.5 3.5 0 0 0 7 0v-8A3.5 3.5 0 0 0 11.5 1z'
          id='microphoneOn24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='microphoneOn24_svg__b'>
          <use xlinkHref='#microphoneOn24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#microphoneOn24_svg__a' />
        <g mask='url(#microphoneOn24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgMicrophoneOn24.displayName = 'SvgMicrophoneOn24'
export default withStyles(styles)(SvgMicrophoneOn24)
