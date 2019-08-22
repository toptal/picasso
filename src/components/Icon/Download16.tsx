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
const SvgDownload16 = forwardRef(function SvgDownload16(
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
          d='M8 10.293l2.5-2.5.707.707L7.5 12.207 3.793 8.5l.707-.707 2.5 2.5V1h1v9.293zM15 14v1H0v-3h1v2h13v-2h1v2z'
          id='download16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='download16_svg__b'>
          <use xlinkHref='#download16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#download16_svg__a' />
        <g mask='url(#download16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgDownload16.displayName = 'SvgDownload16'
export default withStyles(styles)(SvgDownload16)
