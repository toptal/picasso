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

const SvgLanguage24 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgLanguage24'

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
          d='M8 18l-5 5v-5H1V1h22v17H8zm-4 2.586L7.586 17H22V2H2v15h2v3.586zM16.437 14h-1.235l-.767-1.924h-4.316L9.352 14H8.117l3.484-8.671h1.339L16.437 14zm-2.327-2.886l-1.833-4.667-1.846 4.667h3.679z'
          id='language24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='language24_svg__b'>
          <use xlinkHref='#language24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#language24_svg__a' />
        <g mask='url(#language24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgLanguage24.displayName = 'SvgLanguage24'
export default withStyles(styles)(SvgLanguage24)
