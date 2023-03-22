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
  name: 'PicassoSvgWhitePaper16',
})
const SvgWhitePaper16 = forwardRef(function SvgWhitePaper16(
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
          d='M15 0v16H1V0h14Zm-1 1H2v14h12V1ZM8 12v1H4v-1h4Zm3-2v1H4v-1h7ZM7 3l2 5H8l-.4-1H5.4L5 8H4l2-5h1Zm-.5 1.25L5.8 6h1.4l-.7-1.75Z'
          id='whitePaper16_svg__a'
        />
      </defs>
      <g fill='none' fillRule='evenodd'>
        <mask id='whitePaper16_svg__b' fill='#fff'>
          <use xlinkHref='#whitePaper16_svg__a' />
        </mask>
        <use
          fill='currentColor'
          fillRule='nonzero'
          xlinkHref='#whitePaper16_svg__a'
        />
        <g mask='url(#whitePaper16_svg__b)' fill='currentColor'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgWhitePaper16.displayName = 'SvgWhitePaper16'
export default SvgWhitePaper16
