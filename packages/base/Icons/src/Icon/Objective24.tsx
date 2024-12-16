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
  name: 'PicassoSvgObjective24',
})
const SvgObjective24 = forwardRef(function SvgObjective24(
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
      viewBox='0 0 24.01 24'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='m23.03 4.69-3.09-.62-.62-3.09-4.31 4.31v3l-4.85 4.85c-.2.2-.2.51 0 .71a.485.485 0 0 0 .7 0L14 10.71c.63.79.99 1.76.99 2.78 0 2.48-2.01 4.5-4.48 4.5s-4.48-2.02-4.48-4.5 2.01-4.5 4.48-4.5c.41 0 .82.06 1.22.17L12 8.2c-.48-.14-.98-.21-1.49-.21-3.02 0-5.48 2.47-5.48 5.5s2.46 5.5 5.48 5.5 5.48-2.47 5.48-5.5c0-1.3-.46-2.51-1.28-3.49l1.01-1.01h3l.09-.09a9.42 9.42 0 0 1 1.21 4.59c0 5.24-4.27 9.5-9.51 9.5S1 18.74 1 13.5 5.27 4 10.51 4c.87 0 1.73.12 2.56.35l.27-.96c-.92-.26-1.87-.39-2.83-.39C4.72 3 0 7.71 0 13.5S4.72 24 10.51 24s10.51-4.71 10.51-10.5c0-1.89-.52-3.71-1.48-5.33l3.48-3.48ZM18.31 8h-2.29V5.71l2.69-2.69.38 1.91 1.91.38L18.31 8Z' />
    </svg>
  )
})

SvgObjective24.displayName = 'SvgObjective24'
export default SvgObjective24
