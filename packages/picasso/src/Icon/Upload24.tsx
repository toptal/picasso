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
  name: 'PicassoSvgUpload24',
})
const SvgUpload24 = forwardRef(function SvgUpload24(
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
          d='M2 18v3h19v-3h1v4H1v-4h1Zm9.5-16.207L16.207 6.5l-.707.707-3.501-3.501V19H11l-.001-15.294L7.5 7.207 6.793 6.5 11.5 1.793Z'
          id='upload24_svg__a'
        />
      </defs>
      <g fill='none' fillRule='evenodd'>
        <mask id='upload24_svg__b' fill='#fff'>
          <use xlinkHref='#upload24_svg__a' />
        </mask>
        <use
          fill='currentColor'
          fillRule='nonzero'
          xlinkHref='#upload24_svg__a'
        />
        <g mask='url(#upload24_svg__b)' fill='currentColor'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgUpload24.displayName = 'SvgUpload24'
export default SvgUpload24
