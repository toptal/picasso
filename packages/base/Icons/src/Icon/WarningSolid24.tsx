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
  name: 'PicassoSvgWarningSolid24',
})
const SvgWarningSolid24 = forwardRef(function SvgWarningSolid24(
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
        d='M13.303 2.258a1.5 1.5 0 0 0-2.607 0L.45 20.255a1.5 1.5 0 0 0 1.304 2.242h20.494a1.5 1.5 0 0 0 1.303-2.242L13.303 2.258ZM11 7.014a1 1 0 1 1 2 0v7a1 1 0 1 1-2 0v-7Zm2 10.99a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgWarningSolid24.displayName = 'SvgWarningSolid24'
export default SvgWarningSolid24
