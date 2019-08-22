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
const SvgTrash16 = forwardRef(function SvgTrash16(
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
          d='M2 4h1v12H2V4zm0 11h12v1H2v-1zM6 2V0h4v2h5v1H1V2h5zm1 0h2V1H7v1zm6 2h1v12h-1V4zM6 7h1v5H6V7zm3 0h1v5H9V7z'
          id='trash16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='trash16_svg__b'>
          <use xlinkHref='#trash16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#trash16_svg__a' />
        <g mask='url(#trash16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgTrash16.displayName = 'SvgTrash16'
export default withStyles(styles)(SvgTrash16)
