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

const SvgCandidates16 = (props: Props) => {
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
    const name = 'SvgCandidates16'

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
          d='M16 11H7v4l-7-4V1h16v10zm-1-9H1v8.42l5 2.857V10h9V2z'
          id='candidates16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='candidates16_svg__b'>
          <use xlinkHref='#candidates16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#candidates16_svg__a' />
        <g mask='url(#candidates16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgCandidates16.displayName = 'SvgCandidates16'
export default withStyles(styles)(SvgCandidates16)
