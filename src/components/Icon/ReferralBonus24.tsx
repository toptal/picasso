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

const SvgReferralBonus24 = (props: Props) => {
  const { classes, className, style = {}, color, scale, size, base } = props

  if (size) {
    const name = 'SvgReferralBonus24'

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
          d='M13 21.5h-2V24h-1v-2.5c-2.727-.025-5.217-1.515-6.443-3.869l-.231-.443.886-.462.231.443c1.053 2.02 3.199 3.306 5.557 3.33V12.5H8.687a5.288 5.288 0 0 1-3.66-1.457A4.91 4.91 0 0 1 3.5 7.5c0-2.766 2.327-5 5.188-5H10V0h1v2.5h2V0h1v2.5c2.727.025 5.217 1.515 6.443 3.869l.231.443-.886.462-.231-.443c-1.053-2.02-3.199-3.306-5.557-3.33V11.5h1.313c2.86 0 5.187 2.234 5.187 5s-2.327 5-5.188 5H14V24h-1v-2.5zm0-10v-8h-2v8h2zm0 9v-8h-2v8h2zm1 0h1.313c2.317 0 4.187-1.796 4.187-4 0-2.204-1.87-4-4.188-4H14v8zm-4-17H8.687C6.37 3.5 4.5 5.296 4.5 7.5a3.91 3.91 0 0 0 1.22 2.821A4.289 4.289 0 0 0 8.687 11.5H10v-8z'
          id='referralBonus24_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='referralBonus24_svg__b'>
          <use xlinkHref='#referralBonus24_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#referralBonus24_svg__a' />
        <g mask='url(#referralBonus24_svg__b)'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
}

SvgReferralBonus24.displayName = 'SvgReferralBonus24'
export default withStyles(styles)(SvgReferralBonus24)
