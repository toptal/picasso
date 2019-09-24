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
const SvgUploadDocument24 = forwardRef(function SvgUploadDocument24(
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
          d='M19 13h-1V2H2v20h11v1H1V1h18v12zM4 7h12v1H4V7zm0 3h12v1H4v-1zm0 3h5v1H4v-1zm15 3.707V23h-1v-6.293l-2.5 2.5-.707-.707 3.707-3.707.707.707 3 3-.707.707-2.5-2.5z'
          id='uploadDocument24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='uploadDocument24_svg__b'>
          <use xlinkHref='#uploadDocument24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#uploadDocument24_svg__a' />
        <g mask='url(#uploadDocument24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgUploadDocument24.displayName = 'SvgUploadDocument24'
export default withStyles(styles)(SvgUploadDocument24)
