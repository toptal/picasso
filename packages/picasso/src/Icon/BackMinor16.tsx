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
  name: 'PicassoSvgBackMinor16',
})
const SvgBackMinor16 = forwardRef(function SvgBackMinor16(
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
          d='m9.997 3.29.707.707-4 4 4 4-.707.707L5.29 7.997l.707-.707 4-4Z'
          id='backMinor16_svg__a'
        />
      </defs>
      <g fill='none' fillRule='evenodd'>
        <mask id='backMinor16_svg__b' fill='#fff'>
          <use xlinkHref='#backMinor16_svg__a' />
        </mask>
        <use
          fill='currentColor'
          fillRule='nonzero'
          xlinkHref='#backMinor16_svg__a'
        />
        <g mask='url(#backMinor16_svg__b)' fill='currentColor'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgBackMinor16.displayName = 'SvgBackMinor16'
export default SvgBackMinor16
