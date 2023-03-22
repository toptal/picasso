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
  name: 'PicassoSvgPage16',
})
const SvgPage16 = forwardRef(function SvgPage16(
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
          d='M15 0v16H1V0h14Zm-1 1H2v14h12V1ZM7 12v1H4v-1h3Zm2-5v1H4V7h5Zm3-2v1H4V5h8Zm0-2v1H4V3h8Z'
          id='page16_svg__a'
        />
      </defs>
      <g fill='none' fillRule='evenodd'>
        <mask id='page16_svg__b' fill='#fff'>
          <use xlinkHref='#page16_svg__a' />
        </mask>
        <use
          fill='currentColor'
          fillRule='nonzero'
          xlinkHref='#page16_svg__a'
        />
        <g mask='url(#page16_svg__b)' fill='currentColor'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgPage16.displayName = 'SvgPage16'
export default SvgPage16
