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
const SvgStar24 = forwardRef(function SvgStar24(
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
          d='M12 18.5l-6.466 3.4 1.235-7.2-5.23-5.1 7.228-1.05L12 2l3.233 6.55 7.229 1.05-5.231 5.1 1.235 7.2L12 18.5zm0-1.13l5.138 2.701-.982-5.72 4.157-4.052-5.744-.835L12 4.26 9.431 9.464l-5.744.835 4.157 4.051-.982 5.721 5.138-2.7z'
          id='star24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='star24_svg__b'>
          <use xlinkHref='#star24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#star24_svg__a' />
        <g mask='url(#star24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgStar24.displayName = 'SvgStar24'
export default withStyles(styles)(SvgStar24)
