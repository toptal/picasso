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

const SvgUiGuidelines24 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgUiGuidelines24'

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
          d='M23 2h-9v20h9V2zm1 0v21H13V1h11v1zM0 4h10v1H0V4zm0 5h10v1H0V9zm0 5h10v1H0v-1zm0 5h10v1H0v-1z'
          id='uiGuidelines24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='uiGuidelines24_svg__b'>
          <use xlinkHref='#uiGuidelines24_svg__a' />
        </mask>
        <path d='M13.5 1.5h10v21h-10v-21zm10 0h-10v21h10v-21zM5 4.5h5L9.5 4v1l.5-.5H5zm0 0H0l.5.5V4l-.5.5h5zm0 5h5L9.5 9v1l.5-.5H5zm0 0H0l.5.5V9l-.5.5h5zm0 5h5l-.5-.5v1l.5-.5H5zm0 0H0l.5.5v-1l-.5.5h5zm0 5h5l-.5-.5v1l.5-.5H5zm0 0H0l.5.5v-1l-.5.5h5z' />
        <g mask='url(#uiGuidelines24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgUiGuidelines24.displayName = 'SvgUiGuidelines24'
export default withStyles(styles)(SvgUiGuidelines24)
