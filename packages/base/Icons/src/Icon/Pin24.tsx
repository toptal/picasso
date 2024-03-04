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
  name: 'PicassoSvgPin24',
})
const SvgPin24 = forwardRef(function SvgPin24(
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
      <path d='M12 24C6 17.314 3 12.314 3 9a9 9 0 1 1 18 0c0 3.314-3 8.314-9 15ZM4 9c0 2.855 2.656 7.406 8 13.494C17.344 16.406 20 11.855 20 9A8 8 0 1 0 4 9Zm8 3a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm-2-3a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z' />
    </svg>
  )
})

SvgPin24.displayName = 'SvgPin24'
export default SvgPin24
