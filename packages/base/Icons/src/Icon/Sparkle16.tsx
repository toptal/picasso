import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import type { StandardProps } from '@toptal/picasso-shared'
import { kebabToCamelCase } from '@toptal/picasso-utils'

import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgSparkle16',
})
const SvgSparkle16 = forwardRef(function SvgSparkle16(
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
      viewBox='0 0 16 16'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M11.333 8.667A6.551 6.551 0 0 1 9.5 5 6.478 6.478 0 0 1 4 10.5 6.478 6.478 0 0 1 9.5 16a6.478 6.478 0 0 1 5.5-5.5 6.551 6.551 0 0 1-3.667-1.833ZM3.985 4.004A3.572 3.572 0 0 1 2.977 2 3.572 3.572 0 0 1 0 5.006c.763.1 1.472.448 2.015.99A3.572 3.572 0 0 1 3.023 8c.099-.752.436-1.454.962-2.004A3.528 3.528 0 0 1 6 5.006a3.642 3.642 0 0 1-2.015-1.002ZM13.996 1.992A3.6 3.6 0 0 1 13 0a3.6 3.6 0 0 1-.996 1.992A3.6 3.6 0 0 1 10 3c.76.103 1.463.453 2.004.996A3.6 3.6 0 0 1 13 6a3.6 3.6 0 0 1 .996-2.004A3.492 3.492 0 0 1 16 3a3.6 3.6 0 0 1-2.004-1.008Z' />
    </svg>
  )
})

SvgSparkle16.displayName = 'SvgSparkle16'
export default SvgSparkle16
