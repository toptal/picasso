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
  name: 'PicassoSvgBellSolid24',
})
const SvgBellSolid24 = forwardRef(function SvgBellSolid24(
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
        d='M12.001 0h-1.5v1.534a8.25 8.25 0 0 0-7.5 8.216v5.257c0 1.08-.414 1.493-1.501 1.493V18h19.501v-1.5c-1.086 0-1.5-.412-1.5-1.493V9.75a8.25 8.25 0 0 0-7.5-8.216V0Zm-4.5 20.25a3.75 3.75 0 1 0 7.5 0v-.75h-7.5v.75Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgBellSolid24.displayName = 'SvgBellSolid24'
export default SvgBellSolid24
