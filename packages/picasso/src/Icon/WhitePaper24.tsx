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
  name: 'PicassoSvgWhitePaper24',
})
const SvgWhitePaper24 = forwardRef(function SvgWhitePaper24(
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
          d='M22 0v24H2V0h20Zm-1 1H3v22h18V1Zm-9 17v1H6v-1h6Zm4-3v1H6v-1h10ZM10 4l3 8h-1l-.75-2h-3.5L7 12H6l3-8h1Zm-.5 1.333L8.125 9h2.75L9.5 5.333Z'
          id='whitePaper24_svg__a'
        />
      </defs>
      <g fill='none' fillRule='evenodd'>
        <mask id='whitePaper24_svg__b' fill='#fff'>
          <use xlinkHref='#whitePaper24_svg__a' />
        </mask>
        <use
          fill='currentColor'
          fillRule='nonzero'
          xlinkHref='#whitePaper24_svg__a'
        />
        <g mask='url(#whitePaper24_svg__b)' fill='currentColor'>
          <path d='M0 0h24v24H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgWhitePaper24.displayName = 'SvgWhitePaper24'
export default SvgWhitePaper24
