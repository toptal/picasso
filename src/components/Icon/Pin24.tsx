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

const SvgPin24 = (props: Props) => {
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
          d='M12 24C6 17.314 3 12.314 3 9a9 9 0 1 1 18 0c0 3.314-3 8.314-9 15zM4 9c0 2.855 2.656 7.406 8 13.494C17.344 16.406 20 11.855 20 9A8 8 0 1 0 4 9zm8 3a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-2-3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z'
          id='pin24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='pin24_svg__b'>
          <use xlinkHref='#pin24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#pin24_svg__a' />
        <g mask='url(#pin24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgPin24.displayName = 'SvgPin24'
export default withStyles(styles)(SvgPin24)
