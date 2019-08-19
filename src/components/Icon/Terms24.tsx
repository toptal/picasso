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

const SvgTerms24 = (props: Props) => {
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
          d='M2 0h20v24H2V0zm1 1v22h18V1H3zm3 4h12v1H6V5zm0 3h12v1H6V8zm0 3h7v1H6v-1zm0 7h4v1H6v-1z'
          id='terms24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='terms24_svg__b'>
          <use xlinkHref='#terms24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#terms24_svg__a' />
        <g mask='url(#terms24_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgTerms24.displayName = 'SvgTerms24'
export default withStyles(styles)(SvgTerms24)
