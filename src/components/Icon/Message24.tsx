import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  size?: number
  scale?: ScaleType
  color?: string
  base?: number
}

const SvgMessage24 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgMessage24'

    window.console.warn(
      `${name}: size' prop will be removed in the next major release of Picasso. Please use 'scale' to maintain pixel perfect icons`
    )
  }

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
          d='M8 18l-5 5v-5H1V1h22v17H8zm-4 2.586L7.586 17H22V2H2v15h2v3.586z'
          id='message24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='message24_svg__b'>
          <use xlinkHref='#message24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#message24_svg__a' />
        <g mask='url(#message24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgMessage24.displayName = 'SvgMessage24'
export default withStyles(styles)(SvgMessage24)
