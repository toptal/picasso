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
  name: 'PicassoSvgLocation16',
})
const SvgLocation16 = forwardRef(function SvgLocation16(
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
      <path d='M12.97 8C12.73 5.37 10.63 3.26 8 3.03V1H7v2.03C4.37 3.27 2.26 5.37 2.03 8H0v1h2.03c.24 2.63 2.34 4.74 4.97 4.97V16h1v-2.03c2.63-.24 4.74-2.34 4.97-4.97H15V8h-2.03Zm-1.02 1A4.466 4.466 0 0 1 8 12.95V11H7v1.95A4.466 4.466 0 0 1 3.05 9H5V8H3.05A4.466 4.466 0 0 1 7 4.05V6h1V4.05c2.08.23 3.72 1.87 3.95 3.95H10v1h1.95Z' />
    </svg>
  )
})

SvgLocation16.displayName = 'SvgLocation16'
export default SvgLocation16
