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
  name: 'PicassoSvgProject24',
})
const SvgProject24 = forwardRef(function SvgProject24(
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
      <path d='M23 1v22H1V1h22Zm-1 1H2v20h20V2Zm-2 9v9H4v-9h16Zm-1 5h-4v3h4v-3Zm-5 0h-4v3h4v-3Zm-5 0H5v3h4v-3Zm10-4h-4v3h4v-3Zm-5 0h-4v3h4v-3Zm-5 0H5v3h4v-3Zm1-5v1H4V7h6ZM8 4v1H4V4h4Z' />
    </svg>
  )
})

SvgProject24.displayName = 'SvgProject24'
export default SvgProject24
