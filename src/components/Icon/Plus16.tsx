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

const SvgPlus16 = (props: Props) => {
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
        <path d='M8 7h5v1H8v5H7V8H2V7h5V2h1v5z' id='plus16_svg__a' />
      </defs>
      <g fillRule='evenodd'>
        <mask id='plus16_svg__b'>
          <use xlinkHref='#plus16_svg__a' />
        </mask>
        <use xlinkHref='#plus16_svg__a' />
        <g mask='url(#plus16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgPlus16.displayName = 'SvgPlus16'
export default withStyles(styles)(SvgPlus16)
