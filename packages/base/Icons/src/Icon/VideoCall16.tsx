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
  name: 'PicassoSvgVideoCall16',
})
const SvgVideoCall16 = forwardRef(function SvgVideoCall16(
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
      data-name='Layer 2'
      viewBox='0 0 16 16'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='m4.3 12.49.93.38C5.69 11.74 6.78 11 8.01 11s2.31.73 2.78 1.87l.93-.38a4.026 4.026 0 0 0-1.94-2.08A3 3 0 0 0 11.01 8c0-1.65-1.35-3-3-3s-3 1.35-3 3c0 .99.49 1.87 1.23 2.41a3.99 3.99 0 0 0-1.94 2.08ZM6 8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2Zm8.83-7H1.17C.53 1 0 1.52 0 2.17v11.66C0 14.47.52 15 1.17 15h13.66c.64 0 1.17-.52 1.17-1.17V2.17C16 1.53 15.48 1 14.83 1ZM15 13.83c0 .09-.08.17-.17.17H1.17c-.09 0-.17-.08-.17-.17V4h14v9.83ZM15 3H1v-.83c0-.09.08-.17.17-.17h13.66c.09 0 .17.08.17.17V3Z' />
    </svg>
  )
})

SvgVideoCall16.displayName = 'SvgVideoCall16'
export default SvgVideoCall16
