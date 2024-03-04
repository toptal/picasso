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
  name: 'PicassoSvgReferral24',
})
const SvgReferral24 = forwardRef(function SvgReferral24(
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
      viewBox='0 0 24 24'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M6 10.5a4.5 4.5 0 0 1 2.667 8.125 5.998 5.998 0 0 1 3.326 5.076L12 24h-1.5a4.5 4.5 0 0 0-8.992-.264L1.5 24H0a6 6 0 0 1 3.333-5.376A4.5 4.5 0 0 1 6 10.5ZM6 12a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM18 0v1.5h.75a3.75 3.75 0 0 1 3.742 3.503l.008.247H21a2.25 2.25 0 0 0-2.033-2.24L18.75 3H18v4.5h.75a3.75 3.75 0 0 1 .247 7.492L18.75 15H18v1.5h-1.5V15h-.75a3.75 3.75 0 0 1-3.742-3.503L12 11.25h1.5c0 1.17.892 2.13 2.033 2.24l.217.01h.75V9h-.75a3.75 3.75 0 0 1-.247-7.492l.247-.008h.75V0H18Zm.75 9H18v4.5h.75a2.25 2.25 0 0 0 .217-4.49L18.75 9ZM16.5 3h-.75a2.25 2.25 0 0 0-.217 4.49l.217.01h.75V3Z' />
    </svg>
  )
})

SvgReferral24.displayName = 'SvgReferral24'
export default SvgReferral24
