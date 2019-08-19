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

const SvgLock24 = (props: Props) => {
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
          d='M6 10V6a6 6 0 1 1 12 0v4h3v14H3V10h3zm1 0h10V6A5 5 0 0 0 7 6v4zm-1 1H4v12h16V11H6z'
          id='lock24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='lock24_svg__b'>
          <use xlinkHref='#lock24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#lock24_svg__a' />
        <g mask='url(#lock24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgLock24.displayName = 'SvgLock24'
export default withStyles(styles)(SvgLock24)
