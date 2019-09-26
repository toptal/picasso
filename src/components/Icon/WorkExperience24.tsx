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
const SvgWorkExperience24 = forwardRef(function SvgWorkExperience24(
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
          d='M7 10v1H1v4h6v1H0V5h6V3h4v2h6v3h-1V6H1v4h6zm0-5h2V4H7v1zm1 4h16v10H8V9zm1 1v8h14v-8H9zm1 10h12v1H10v-1z'
          id='workExperience24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='workExperience24_svg__b'>
          <use xlinkHref='#workExperience24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#workExperience24_svg__a' />
        <g mask='url(#workExperience24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgWorkExperience24.displayName = 'SvgWorkExperience24'
export default withStyles(styles)(SvgWorkExperience24)
