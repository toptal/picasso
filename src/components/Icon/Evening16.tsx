import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  size?: number
  scale?: ScaleType
  color?: string
  base?: number
}

const SvgEvening16 = (props: Props) => {
  const {
    classes,
    className,
    style = {},
    color,
    scale,
    size,
    base,
    elementSelector
  } = props

  if (size) {
    const name = 'SvgEvening16'

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
      viewBox='0 0 16 16'
      className={cx(classes.root, className)}
      style={svgStyle}
      color={color}
      data-qa={elementSelector}
    >
      <defs>
        <path
          d='M14 12v-1h1v1h1v1h-1v1h-1v-1h-1v-1h1zM7 9V8h1v1h1v1H8v1H7v-1H6V9h1zm5-4V3h1v2h2v1h-2v2h-1V6h-2V5h2zM2 13v-2h1v2h2v1H3v2H2v-2H0v-1h2zM5 2h2v1H5v2H4V3H2V2h2V0h1v2z'
          id='evening16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='evening16_svg__b'>
          <use xlinkHref='#evening16_svg__a' />
        </mask>
        <use xlinkHref='#evening16_svg__a' />
        <g mask='url(#evening16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgEvening16.displayName = 'SvgEvening16'
export default withStyles(styles)(SvgEvening16)
