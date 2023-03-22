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
  name: 'PicassoSvgStar16',
})
const SvgStar16 = forwardRef(function SvgStar16(
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
          d='m8 11.5-4.114 2.163.785-4.581-3.328-3.245 4.6-.669L8 1l2.057 4.168 4.6.669-3.328 3.245.785 4.581L8 11.5Zm0-1.13 2.786 1.465-.532-3.103 2.254-2.197-3.115-.453L8 3.26 6.607 6.082l-3.115.453 2.254 2.197-.532 3.103L8 10.37Z'
          id='star16_svg__a'
        />
      </defs>
      <g fill='none' fillRule='evenodd'>
        <mask id='star16_svg__b' fill='#fff'>
          <use xlinkHref='#star16_svg__a' />
        </mask>
        <use
          fill='currentColor'
          fillRule='nonzero'
          xlinkHref='#star16_svg__a'
        />
        <g mask='url(#star16_svg__b)' fill='currentColor'>
          <path d='M0 0h16v16H0z' />
        </g>
      </g>
    </svg>
  )
})

SvgStar16.displayName = 'SvgStar16'
export default SvgStar16
