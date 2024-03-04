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
  name: 'PicassoSvgGuests16',
})
const SvgGuests16 = forwardRef(function SvgGuests16(
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
      <path d='M4 1v1H3v13h10V2h-1V1h2v15H2V1h2Zm6 11v1H6v-1h4ZM8 5a2 2 0 0 1 1.452 3.375 2.998 2.998 0 0 1 1.542 2.427L11 11h-1a2 2 0 0 0-3.995-.15L6 11H5a3 3 0 0 1 1.549-2.626A2 2 0 0 1 8 5Zm0 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm3-6v3H5V0h6Zm-1 1H6v1h4V1Z' />
    </svg>
  )
})

SvgGuests16.displayName = 'SvgGuests16'
export default SvgGuests16
