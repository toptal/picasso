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
const SvgShare16 = forwardRef(function SvgShare16(
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
          d='M14 14v1H0V3h9v1H1v10h12V7h1v7zM10 1h6v5h-6V1zm1 1v3h4V2h-4z'
          id='share16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='share16_svg__b'>
          <use xlinkHref='#share16_svg__a' />
        </mask>
        <use xlinkHref='#share16_svg__a' />
        <g mask='url(#share16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgShare16.displayName = 'SvgShare16'
export default withStyles(styles)(SvgShare16)
