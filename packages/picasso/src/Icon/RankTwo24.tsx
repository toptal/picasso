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
  name: 'PicassoSvgRankTwo24',
})
const SvgRankTwo24 = forwardRef(function SvgRankTwo24(
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
          d='m12 10.86 8.203 6.562-.625.78L12 12.14l-7.578 6.063-.625-.781L12 10.86Zm0-6 8.203 6.562-.625.78L12 6.14l-7.578 6.063-.625-.781L12 4.86Z'
          id='rankTwo24_svg__a'
        />
      </defs>
      <g fill='none' fillRule='evenodd'>
        <mask id='rankTwo24_svg__b' fill='#fff'>
          <use xlinkHref='#rankTwo24_svg__a' />
        </mask>
        <use
          fill='currentColor'
          fillRule='nonzero'
          xlinkHref='#rankTwo24_svg__a'
        />
        <g mask='url(#rankTwo24_svg__b)' fill='currentColor'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgRankTwo24.displayName = 'SvgRankTwo24'
export default SvgRankTwo24
