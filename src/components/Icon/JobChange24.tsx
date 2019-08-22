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
const SvgJobChange24 = forwardRef(function SvgJobChange24(
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
          d='M14 12v1H1v5h13v1H0V6h7V3h6v3h7v5h-1V7H1v5h13zM8 6h4V4H8v2zm11.5 10.793l2-2 .707.707-2 2-.707.707-1.707-1.707.707-.707 1 1zm0 4.207a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z'
          id='jobChange24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='jobChange24_svg__b'>
          <use xlinkHref='#jobChange24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#jobChange24_svg__a' />
        <g mask='url(#jobChange24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgJobChange24.displayName = 'SvgJobChange24'
export default withStyles(styles)(SvgJobChange24)
