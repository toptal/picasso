import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgNumericalAnalysis24',
})
const SvgNumericalAnalysis24 = forwardRef(function SvgNumericalAnalysis24(
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
      viewBox='0 0 24 24'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <defs>
        <path
          d='M23 1v22H1V1h22Zm-1 1H2v20h20V2Zm-5 17v1h-1v-1h1Zm-7.379-5.328.707.707-2.12 2.121 2.12 2.121-.707.707-2.121-2.12-2.121 2.12-.707-.707 2.12-2.121-2.12-2.121.707-.707 2.121 2.12 2.121-2.12ZM20 16v1h-7v-1h7Zm-3-3v1h-1v-1h1ZM8 4v3h3v1H8v3H7V8H4V7h3V4h1Zm12 3v1h-7V7h7Z'
          id='numericalAnalysis24_svg__a'
        />
      </defs>
      <g fill='none' fillRule='evenodd'>
        <mask id='numericalAnalysis24_svg__b' fill='#fff'>
          <use xlinkHref='#numericalAnalysis24_svg__a' />
        </mask>
        <use
          fill='#979797'
          fillRule='nonzero'
          xlinkHref='#numericalAnalysis24_svg__a'
        />
        <g mask='url(#numericalAnalysis24_svg__b)' fill='currentColor'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgNumericalAnalysis24.displayName = 'SvgNumericalAnalysis24'
export default SvgNumericalAnalysis24
