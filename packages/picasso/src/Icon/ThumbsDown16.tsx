import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgThumbsDown16',
})
const SvgThumbsDown16 = forwardRef(function SvgThumbsDown16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    className,
    style = {},
    color,
    scale,
    base,
    'data-testid': testId,
  } = props
  const classes: Record<string, string> = useStyles(props)
  const classNames = [classes.root, className]
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const colorClassName = kebabToCamelCase(`${color}`)

  if (classes[colorClassName]) {
    classNames.push(classes[colorClassName])
  }

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style,
  }

  return (
    <svg
      viewBox='0 0 16 16'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <defs>
        <path
          d='M7.003 1c1.664 0 3.33.333 5 1h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2.45L8.41 15.288a1 1 0 0 1-1.185.453l-.722-.241a1.707 1.707 0 0 1-1.116-2.034l.641-2.56-1.761.319A3 3 0 0 1 .778 7.737l.628-3.453A4 4 0 0 1 5.342 1h1.661ZM12 9h2.003V3H12L12 9ZM7.003 2H5.342A3 3 0 0 0 2.39 4.463l-.628 3.452a2 2 0 0 0 2.326 2.326l3.287-.596-.377 1.503-.641 2.56a.707.707 0 0 0 .462.843l.723.241.008-.015L10.984 9H11V2.693A12.144 12.144 0 0 0 7.003 2Z'
          id='thumbsDown16_svg__a'
        />
      </defs>
      <g fill='none' fillRule='evenodd'>
        <mask id='thumbsDown16_svg__b' fill='#fff'>
          <use xlinkHref='#thumbsDown16_svg__a' />
        </mask>
        <use
          fill='currentColor'
          fillRule='nonzero'
          xlinkHref='#thumbsDown16_svg__a'
        />
        <g mask='url(#thumbsDown16_svg__b)' fill='currentColor'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgThumbsDown16.displayName = 'SvgThumbsDown16'
export default SvgThumbsDown16
