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
const SvgSort16 = forwardRef(function SvgSort16(
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
          d='M5 5v8.292l2.5-2.5.707.708L4.5 15.207l-.707-.707-3-3 .707-.707 2.5 2.5V5h1zM11.5.793L15.207 4.5l-.707.707-2.5-2.5V11h-1V2.707l-2.5 2.5-.707-.707 3-3L11.5.793z'
          id='sort16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='sort16_svg__b'>
          <use xlinkHref='#sort16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#sort16_svg__a' />
        <g mask='url(#sort16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgSort16.displayName = 'SvgSort16'
export default withStyles(styles)(SvgSort16)
