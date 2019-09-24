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
const SvgParticipants24 = forwardRef(function SvgParticipants24(
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
          d='M16.953 16.437a4 4 0 1 1 4.095 0A5.001 5.001 0 0 1 24 21h-1a4 4 0 0 0-6.222-3.327l-.556-.83c.232-.156.476-.291.73-.406zM5.428 13.422a6 6 0 1 1 5.144 0A8.003 8.003 0 0 1 16 21h-1a7 7 0 0 0-14 0H0a8.003 8.003 0 0 1 5.428-7.578zM8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10zm11 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
          id='participants24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='participants24_svg__b'>
          <use xlinkHref='#participants24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#participants24_svg__a' />
        <g mask='url(#participants24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgParticipants24.displayName = 'SvgParticipants24'
export default withStyles(styles)(SvgParticipants24)
