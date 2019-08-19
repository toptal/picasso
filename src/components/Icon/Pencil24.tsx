import React from 'react'
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

const SvgPencil24 = (props: Props) => {
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
    >
      <defs>
        <path
          d='M14.5 5.207L2 17.707V22h4.293l12.5-12.5L14.5 5.207zm.707-.707L19.5 8.793 21.793 6.5 17.5 2.207 15.207 4.5zM1 17.293L17.5.793 23.207 6.5 6.707 23H1v-5.707z'
          id='pencil24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='pencil24_svg__b'>
          <use xlinkHref='#pencil24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#pencil24_svg__a' />
        <g mask='url(#pencil24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgPencil24.displayName = 'SvgPencil24'
export default withStyles(styles)(SvgPencil24)
