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
  name: 'PicassoSvgComponent16',
})
const SvgComponent16 = forwardRef(function SvgComponent16(
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
          d='M11 15v1H5v-1h6Zm2-12v10H3V3h10Zm-1 1H4v8h8V4ZM1 5v6H0V5h1Zm15 0v6h-1V5h1Zm-5-5v1H5V0h6Z'
          id='component16_svg__a'
        />
      </defs>
      <g fill='none' fillRule='evenodd'>
        <mask id='component16_svg__b' fill='#fff'>
          <use xlinkHref='#component16_svg__a' />
        </mask>
        <use
          fill='#979797'
          fillRule='nonzero'
          xlinkHref='#component16_svg__a'
        />
        <g mask='url(#component16_svg__b)' fill='currentColor'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgComponent16.displayName = 'SvgComponent16'
export default SvgComponent16
