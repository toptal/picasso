import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgFilter16 = forwardRef(function SvgFilter16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const { classes, className, style = {}, color, scale, base } = props
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style
  }

  return (
    <svg
      viewBox='0 0 16 16'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
      ref={ref}
    >
      <defs>
        <path
          d='M0 4h16v1H0V4zm4 8h8v1H4v-1zm10-4v1H2V8h12z'
          id='filter16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='filter16_svg__b'>
          <use xlinkHref='#filter16_svg__a' />
        </mask>
        <use xlinkHref='#filter16_svg__a' />
        <g mask='url(#filter16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgFilter16.displayName = 'SvgFilter16'
export default withStyles(styles)(SvgFilter16)
