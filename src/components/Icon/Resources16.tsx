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
const SvgResources16 = forwardRef(function SvgResources16(
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
          d='M11 0l4 4v12H1V0h10zm-.414 1H2v14h12V4.414L10.586 1zM8 9v2H7V8h1a2 2 0 1 0-2-2H5a3 3 0 1 1 3 3zm-1 3h1v1H7v-1z'
          id='resources16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='resources16_svg__b'>
          <use xlinkHref='#resources16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#resources16_svg__a' />
        <g mask='url(#resources16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgResources16.displayName = 'SvgResources16'
export default withStyles(styles)(SvgResources16)
