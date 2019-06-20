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

const SvgJobs24 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgJobs24'

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
          d='M15 6H1v7h22V6h-8zM9 5V2h6v3h9v17H0V5h9zm1 0h4V3h-4v2zm13 9H1v7h22v-7z'
          id='jobs24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='jobs24_svg__b'>
          <use xlinkHref='#jobs24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#jobs24_svg__a' />
        <g mask='url(#jobs24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgJobs24.displayName = 'SvgJobs24'
export default withStyles(styles)(SvgJobs24)
