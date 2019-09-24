import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import { StandardProps, ColorType } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: ColorType | string
  base?: number
}
const SvgLanguage16 = forwardRef(function SvgLanguage16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    classes: availableClasses,
    className,
    style = {},
    color,
    scale,
    base
  } = props
  const classes = [availableClasses.root, className]
  let svgColor
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const colorClassName = kebabToCamelCase(`${color}`)

  if (!availableClasses[`${colorClassName}`]) {
    svgColor = color
  } else {
    classes.push(availableClasses[colorClassName])
  }

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style
  }

  return (
    <svg
      viewBox='0 0 16 16'
      className={cx(...classes)}
      style={svgStyle}
      color={svgColor}
      ref={ref}
    >
      <defs>
        <path
          d='M6 12l-4 4v-4H0V0h16v12H6zm-3 1.586L5.586 11H15V1H1v10h2v2.586zM11.039 9H9.842l-.441-1.152H6.647L6.206 9H5.009l2.358-6.003h1.314L11.039 9zM9.104 6.921l-1.08-2.862-1.08 2.862h2.16z'
          id='language16_svg__a'
        />
      </defs>
      <g fillRule='evenodd'>
        <mask id='language16_svg__b'>
          <use xlinkHref='#language16_svg__a' />
        </mask>
        <use fillRule='nonzero' xlinkHref='#language16_svg__a' />
        <g mask='url(#language16_svg__b)'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgLanguage16.displayName = 'SvgLanguage16'
export default withStyles(styles)(SvgLanguage16)
