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

const SvgVideoOff16 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgVideoOff16'

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
    >
      <defs>
        <path
          d='M12.869 5.252L16 4v8l-4-1.6V13H5.121l1-1H11V7.121l1.869-1.869zM.879 13H0V3h10.879l-1 1H1v8h.879l-1 1zM12 6.677v2.646l3 1.2V5.477l-3 1.2zm-10.5 8.53L.793 14.5 14.5.793l.707.707L1.5 15.207z'
          id='videoOff16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='videoOff16_svg__b'>
          <use xlinkHref='#videoOff16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#videoOff16_svg__a' />
        <g mask='url(#videoOff16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgVideoOff16.displayName = 'SvgVideoOff16'
export default withStyles(styles)(SvgVideoOff16)
