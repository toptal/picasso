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
const SvgUpdate24 = forwardRef(function SvgUpdate24(
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
          d='M4.5 17.832V20.5h-1v-4h4v1H5.519a8.47 8.47 0 0 0 6.481 3 8.5 8.5 0 0 0 8.5-8.5h1a9.5 9.5 0 0 1-17 5.832zm15-11.664V3.5h1v4h-4v-1h1.981A8.47 8.47 0 0 0 12 3.5 8.5 8.5 0 0 0 3.5 12h-1a9.5 9.5 0 0 1 17-5.832z'
          id='update24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='update24_svg__b'>
          <use xlinkHref='#update24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#update24_svg__a' />
        <g mask='url(#update24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgUpdate24.displayName = 'SvgUpdate24'
export default withStyles(styles)(SvgUpdate24)
