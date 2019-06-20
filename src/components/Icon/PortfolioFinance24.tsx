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

const SvgPortfolioFinance24 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgPortfolioFinance24'

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
          d='M1.106 15.447L12 20.882l10.894-5.435L24 16l-12 6-12-6 1.106-.553zm0-4L12 16.882l10.894-5.435L24 12l-12 6-12-6 1.106-.553zM0 8l12-6 12 6-12 6L0 8zm12 4.882L21.764 8 12 3.118 2.236 8 12 12.882z'
          id='portfolioFinance24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='portfolioFinance24_svg__b'>
          <use xlinkHref='#portfolioFinance24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#portfolioFinance24_svg__a' />
        <g mask='url(#portfolioFinance24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgPortfolioFinance24.displayName = 'SvgPortfolioFinance24'
export default withStyles(styles)(SvgPortfolioFinance24)
