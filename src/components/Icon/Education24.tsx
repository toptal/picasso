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
const SvgEducation24 = forwardRef(function SvgEducation24(
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
          d='M16.996 19.794L19 23h-5l1.996-3.194V9.794L11.32 7.193l.486-.874 5.19 2.887v10.588zm1-3.236V15.44L19 14.938V9.056l-1.004.502v-.94l-.168-.094 3.055-1.527-8.859-4.438L3.12 6.998 12 11.438l2.578-1.289.418.233v.676L12 12.556l-7-3.5v5.882l7 3.5 2.996-1.498v1.118L12 19.556l-8-4v-7L.88 6.996l11.146-5.555 11.091 5.557L20 8.556v7l-2.004 1.002zM15.804 22h1.392l-.696-1.113L15.804 22z'
          id='education24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='education24_svg__b'>
          <use xlinkHref='#education24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#education24_svg__a' />
        <g mask='url(#education24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgEducation24.displayName = 'SvgEducation24'
export default withStyles(styles)(SvgEducation24)
