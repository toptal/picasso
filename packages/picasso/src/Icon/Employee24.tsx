import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import type { StandardProps } from '@toptal/picasso-shared'

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
  name: 'PicassoSvgEmployee24',
})
const SvgEmployee24 = forwardRef(function SvgEmployee24(
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
      fill='none'
      viewBox='0 0 24 24'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        d='M12 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM8 4a4 4 0 1 1 8 0 4 4 0 0 1-8 0ZM.328 15H6c0-3.316 2.684-6 6-6s6 2.684 6 6h5.672l-.193.644-1.5 5-.107.356H19v3h-1v-5h1v1h2.128l1.2-4H1.672l1.2 4H5v-1h1v5H5v-3H2.128l-.107-.356-1.5-5L.328 15ZM17 15c0-2.764-2.236-5-5-5s-5 2.236-5 5h10Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgEmployee24.displayName = 'SvgEmployee24'
export default SvgEmployee24
