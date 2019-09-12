import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const SvgSort24 = forwardRef(function SvgSort24(
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
      viewBox='0 0 24 24'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
      ref={ref}
    >
      <defs>
        <path
          d='M7 7v13.292l4.5-4.5.707.708L6.5 22.207l-.707-.707-5-5 .707-.707 4.5 4.5V7h1zm10.5-5.207L23.207 7.5l-.707.707-4.5-4.5V17h-1V3.707l-4.5 4.5-.707-.707 5-5 .707-.707z'
          id='sort24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='sort24_svg__b'>
          <use xlinkHref='#sort24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#sort24_svg__a' />
        <g mask='url(#sort24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgSort24.displayName = 'SvgSort24'
export default withStyles(styles)(SvgSort24)
