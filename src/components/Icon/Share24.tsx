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

const SvgShare24 = (props: Props) => {
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
          d='M19 20v1H0V6h12v1H1v13h17v-9h1v9zM13 3h11v7H13V3zm1 1v5h9V4h-9z'
          id='share24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='share24_svg__b'>
          <use xlinkHref='#share24_svg__a' />
        </mask>
        <use xlinkHref='#share24_svg__a' />
        <g mask='url(#share24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgShare24.displayName = 'SvgShare24'
export default withStyles(styles)(SvgShare24)
