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

const SvgTrash24 = (props: Props) => {
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
          d='M9 3V0h6v3h8v1H1V3h8zm1 0h4V1h-4v2zm10 20V5h1v19H3V5h1v18h16zM9 10h1v8H9v-8zm5 0h1v8h-1v-8z'
          id='trash24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='trash24_svg__b'>
          <use xlinkHref='#trash24_svg__a' />
        </mask>
        <use xlinkHref='#trash24_svg__a' />
        <g mask='url(#trash24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgTrash24.displayName = 'SvgTrash24'
export default withStyles(styles)(SvgTrash24)
