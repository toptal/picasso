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
const SvgUiGuidelines16 = forwardRef(function SvgUiGuidelines16(
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
          d='M15 2h-5v12h5V2zm1 0v13H9V1h7v1zM0 3h7v1H0V3zm0 3h7v1H0V6zm0 3h7v1H0V9zm0 3h7v1H0v-1z'
          id='uiGuidelines16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='uiGuidelines16_svg__b'>
          <use xlinkHref='#uiGuidelines16_svg__a' />
        </mask>
        <use xlinkHref='#uiGuidelines16_svg__a' />
        <g mask='url(#uiGuidelines16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgUiGuidelines16.displayName = 'SvgUiGuidelines16'
export default withStyles(styles)(SvgUiGuidelines16)
