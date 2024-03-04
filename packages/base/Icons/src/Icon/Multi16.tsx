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
  name: 'PicassoSvgMulti16',
})
const SvgMulti16 = forwardRef(function SvgMulti16(
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
      <path d='m12 7 3.464 2v4L12 15l-3.464-2V9L12 7ZM4 7l3.464 2v4L4 15 .536 13V9L4 7Zm8 1.155L9.535 9.577v2.845L12 13.844l2.464-1.422V9.577L12 8.155Zm-8 0L1.535 9.577v2.845L4 13.844l2.464-1.422V9.577L4 8.155ZM8 0l3.464 2v4L8 8 4.536 6V2L8 0Zm0 1.155L5.535 2.577v2.845L8 6.844l2.464-1.422V2.577L8 1.155Z' />
    </svg>
  )
})

SvgMulti16.displayName = 'SvgMulti16'
export default SvgMulti16
