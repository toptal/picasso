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

const SvgOverview16 = (props: Props) => {
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
          d='M0 13h16v1H0v-1zm0-5h16v1H0V8zm0-5h16v1H0V3z'
          id='overview16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='overview16_svg__b'>
          <use xlinkHref='#overview16_svg__a' />
        </mask>
        <use xlinkHref='#overview16_svg__a' />
        <g mask='url(#overview16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgOverview16.displayName = 'SvgOverview16'
export default withStyles(styles)(SvgOverview16)
