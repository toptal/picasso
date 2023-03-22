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
  name: 'PicassoSvgStar24',
})
const SvgStar24 = forwardRef(function SvgStar24(
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
          d='m12 18.5-6.466 3.4 1.235-7.2-5.23-5.1 7.228-1.05L12 2l3.233 6.55 7.229 1.05-5.231 5.1 1.235 7.2L12 18.5Zm0-1.13 5.138 2.701-.982-5.72 4.157-4.052-5.744-.835L12 4.26 9.431 9.464l-5.744.835 4.157 4.051-.982 5.721 5.138-2.7Z'
          id='star24_svg__a'
        />
      </defs>
      <g fill='none' fillRule='evenodd'>
        <mask id='star24_svg__b' fill='#fff'>
          <use xlinkHref='#star24_svg__a' />
        </mask>
        <use
          fill='currentColor'
          fillRule='nonzero'
          xlinkHref='#star24_svg__a'
        />
        <g mask='url(#star24_svg__b)' fill='currentColor'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgStar24.displayName = 'SvgStar24'
export default SvgStar24
