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

const SvgCandidates24 = (props: Props) => {
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
          d='M24 17H11v6L0 17V2h24v15zM23 3H1v13.42l9 4.857V16h13V3z'
          id='candidates24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='candidates24_svg__b'>
          <use xlinkHref='#candidates24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#candidates24_svg__a' />
        <g mask='url(#candidates24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgCandidates24.displayName = 'SvgCandidates24'
export default withStyles(styles)(SvgCandidates24)
