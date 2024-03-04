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
  name: 'PicassoSvgJobChange16',
})
const SvgJobChange16 = forwardRef(function SvgJobChange16(
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
      <path d='M6 7v1H1v3h5v1H0V3h4V1h4v2h4v2h-1V4H1v3h5ZM5 3h2V2H5v1Zm6.5 7.793 2-2 .707.707-2 2-.707.707L9.793 10.5l.707-.707 1 1Zm0 4.207a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z' />
    </svg>
  )
})

SvgJobChange16.displayName = 'SvgJobChange16'
export default SvgJobChange16
