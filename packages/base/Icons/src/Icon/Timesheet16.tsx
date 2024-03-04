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
  name: 'PicassoSvgTimesheet16',
})
const SvgTimesheet16 = forwardRef(function SvgTimesheet16(
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
      <path d='M3 4v1H1v10h13V5h-2V4h3v12H0V4h3Zm6 8v1H3v-1h6Zm3 0v1h-2v-1h2ZM9 9v1H3V9h6Zm3 0v1h-2V9h2ZM7.5 0a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm0 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM8 2v2H6V3h1V2h1Z' />
    </svg>
  )
})

SvgTimesheet16.displayName = 'SvgTimesheet16'
export default SvgTimesheet16
