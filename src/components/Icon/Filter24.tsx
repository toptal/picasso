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
const SvgFilter24 = forwardRef(function SvgFilter24(
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
          d='M0 6h24v1H0V6zm6 12h12v1H6v-1zm15-6v1H3v-1h18z'
          id='filter24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='filter24_svg__b'>
          <use xlinkHref='#filter24_svg__a' />
        </mask>
        <use xlinkHref='#filter24_svg__a' />
        <g mask='url(#filter24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgFilter24.displayName = 'SvgFilter24'
export default withStyles(styles)(SvgFilter24)
