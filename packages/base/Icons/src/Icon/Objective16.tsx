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
  name: 'PicassoSvgObjective16',
})
const SvgObjective16 = forwardRef(function SvgObjective16(
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
      <path d='m15.42 3.29-2.02-.68-.68-2.02-2.71 2.71v2L6.66 8.65c-.2.2-.2.51 0 .71a.485.485 0 0 0 .7 0l2.09-2.09c.36.5.56 1.1.56 1.73 0 1.65-1.35 3-3 3s-3-1.35-3-3a3.009 3.009 0 0 1 3.82-2.89l.27-.96A3.999 3.999 0 0 0 3.01 9c0 2.21 1.79 4 4 4s4-1.79 4-4c0-.9-.31-1.74-.85-2.44l.56-.56h1.47c.53.91.82 1.94.82 3 0 3.31-2.69 6-6 6S1 12.31 1 9a6.005 6.005 0 0 1 7.62-5.78l.27-.96C8.28 2.09 7.65 2 7.01 2 3.14 2 0 5.14 0 9s3.14 7 7 7 7-3.14 7-7c0-1.2-.32-2.36-.9-3.4l2.32-2.32ZM12.29 5H11V3.71l1.28-1.28.33.97.97.33-1.28 1.28Z' />
    </svg>
  )
})

SvgObjective16.displayName = 'SvgObjective16'
export default SvgObjective16
