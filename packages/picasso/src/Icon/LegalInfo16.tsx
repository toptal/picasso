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
  name: 'PicassoSvgLegalInfo16',
})
const SvgLegalInfo16 = forwardRef(function SvgLegalInfo16(
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
          d='m11 0 4 4v12H1V0h10Zm-.414 1H2v14h12V4.414L10.586 1ZM8 11V7H6V6h3v5h2v1H6v-1h2ZM7 4h2v1H7V4Z'
          id='legalInfo16_svg__a'
        />
      </defs>
      <g fill='none' fillRule='evenodd'>
        <mask id='legalInfo16_svg__b' fill='#fff'>
          <use xlinkHref='#legalInfo16_svg__a' />
        </mask>
        <use
          fill='currentColor'
          fillRule='nonzero'
          xlinkHref='#legalInfo16_svg__a'
        />
        <g mask='url(#legalInfo16_svg__b)' fill='currentColor'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgLegalInfo16.displayName = 'SvgLegalInfo16'
export default SvgLegalInfo16
