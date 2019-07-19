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

const SvgUiGuidelines16 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgUiGuidelines16'

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
          d='M15 2h-5v12h5V2zm1 0v13H9V1h7v1zM0 3h7v1H0V3zm0 3h7v1H0V6zm0 3h7v1H0V9zm0 3h7v1H0v-1z'
          id='uiGuidelines16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='uiGuidelines16_svg__b'>
          <use xlinkHref='#uiGuidelines16_svg__a' />
        </mask>
        <path d='M9.5 1.5h6v13h-6v-13zm6 0h-6v13h6v-13zm-12 2H7L6.5 3v1l.5-.5H3.5zm0 0H0l.5.5V3l-.5.5h3.5zm0 3H7L6.5 6v1l.5-.5H3.5zm0 0H0l.5.5V6l-.5.5h3.5zm0 3H7L6.5 9v1l.5-.5H3.5zm0 0H0l.5.5V9l-.5.5h3.5zm0 3H7l-.5-.5v1l.5-.5H3.5zm0 0H0l.5.5v-1l-.5.5h3.5z' />
        <g mask='url(#uiGuidelines16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgUiGuidelines16.displayName = 'SvgUiGuidelines16'
export default withStyles(styles)(SvgUiGuidelines16)
