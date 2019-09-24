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
const SvgJobs16 = forwardRef(function SvgJobs16(
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
          d='M10 5H1v4h14V5h-5zM6 4V2h4v2h6v11H0V4h6zm1 0h2V3H7v1zm8 6H1v4h14v-4z'
          id='jobs16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='jobs16_svg__b'>
          <use xlinkHref='#jobs16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#jobs16_svg__a' />
        <g mask='url(#jobs16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgJobs16.displayName = 'SvgJobs16'
export default withStyles(styles)(SvgJobs16)
