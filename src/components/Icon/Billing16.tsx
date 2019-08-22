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
const SvgBilling16 = forwardRef(function SvgBilling16(
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
          d='M11 0l4 4v12H1V0h10zm-.414 1H2v14h12V4.414L10.586 1zM4 5h2v1H4V5zm0 3h2v1H4V8zm4-3h4v1H8V5zm0 3h4v1H8V8zm0 3h4v1H8v-1z'
          id='billing16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='billing16_svg__b'>
          <use xlinkHref='#billing16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#billing16_svg__a' />
        <g mask='url(#billing16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgBilling16.displayName = 'SvgBilling16'
export default withStyles(styles)(SvgBilling16)
