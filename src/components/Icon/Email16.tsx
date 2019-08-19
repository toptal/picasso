import React from 'react'
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

const SvgEmail16 = (props: Props) => {
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
    >
      <defs>
        <path
          d='M1.768 3L8 8.342 14.232 3H1.768zM15 3.659l-7 6-7-6V13h14V3.659zM0 2h16v12H0V2z'
          id='email16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='email16_svg__b'>
          <use xlinkHref='#email16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#email16_svg__a' />
        <g mask='url(#email16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgEmail16.displayName = 'SvgEmail16'
export default withStyles(styles)(SvgEmail16)
