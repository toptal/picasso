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

const SvgMicrophoneOff16 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgMicrophoneOff16'

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
          d='M5.497 12.624l.79-.79A4.504 4.504 0 0 0 12 7.5h1a5.5 5.5 0 0 1-5 5.478V15h3v1H4v-1h3v-2.022a5.468 5.468 0 0 1-1.503-.354zm-2.406-1.836A5.476 5.476 0 0 1 2 7.5h1c0 .956.298 1.843.807 2.572l-.716.716zm7.862-7.862L10 3.879V3.5a2.5 2.5 0 0 0-5 0v4c0 .401.094.78.262 1.116l-.734.734A3.484 3.484 0 0 1 4 7.5v-4a3.5 3.5 0 0 1 6.953-.574zM11 7.12V7.5a3.5 3.5 0 0 1-3.86 3.482l1.09-1.09a2.506 2.506 0 0 0 1.662-1.663L11 7.121zm-9.5 8.086L.793 14.5 14.5.793l.707.707L1.5 15.207z'
          id='microphoneOff16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='microphoneOff16_svg__b'>
          <use xlinkHref='#microphoneOff16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#microphoneOff16_svg__a' />
        <g mask='url(#microphoneOff16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgMicrophoneOff16.displayName = 'SvgMicrophoneOff16'
export default withStyles(styles)(SvgMicrophoneOff16)
