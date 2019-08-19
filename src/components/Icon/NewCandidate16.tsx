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

const SvgNewCandidate16 = (props: Props) => {
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
          d='M13 3V1h1v2h2v1h-2v2h-1V4h-2V3h2zM3.873 9.388a4 4 0 1 1 4.255 0A6.002 6.002 0 0 1 12 15h-1a5 5 0 0 0-10 0H0a6.002 6.002 0 0 1 3.873-5.612zM6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
          id='newCandidate16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='newCandidate16_svg__b'>
          <use xlinkHref='#newCandidate16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#newCandidate16_svg__a' />
        <g mask='url(#newCandidate16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgNewCandidate16.displayName = 'SvgNewCandidate16'
export default withStyles(styles)(SvgNewCandidate16)
