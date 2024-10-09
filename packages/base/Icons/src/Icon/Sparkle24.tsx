import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import type { StandardProps } from '@toptal/picasso-shared'
import { kebabToCamelCase } from '@toptal/picasso-utils'

import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgSparkle24',
})
const SvgSparkle24 = forwardRef(function SvgSparkle24(
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
      <path d='M18 13a8.963 8.963 0 0 1-2.5-5A8.837 8.837 0 0 1 8 15.5a8.837 8.837 0 0 1 7.5 7.5 8.837 8.837 0 0 1 7.5-7.5 8.875 8.875 0 0 1-5-2.5ZM5.33 7.67A4.83 4.83 0 0 1 4 5a4.83 4.83 0 0 1-1.33 2.67A4.8 4.8 0 0 1 0 9a4.8 4.8 0 0 1 2.67 1.33A4.83 4.83 0 0 1 4 13a4.7 4.7 0 0 1 4-4 4.8 4.8 0 0 1-2.67-1.33ZM21.667 2.333A4.211 4.211 0 0 1 20.5 0a4.211 4.211 0 0 1-1.167 2.333A4.13 4.13 0 0 1 17 3.5a4.13 4.13 0 0 1 2.333 1.167A4.211 4.211 0 0 1 20.5 7a4.211 4.211 0 0 1 1.167-2.333A4.13 4.13 0 0 1 24 3.5a4.13 4.13 0 0 1-2.333-1.167Z' />
    </svg>
  )
})

SvgSparkle24.displayName = 'SvgSparkle24'
export default SvgSparkle24
