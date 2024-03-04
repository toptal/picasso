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
  name: 'PicassoSvgBankWire16',
})
const SvgBankWire16 = forwardRef(function SvgBankWire16(
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
      <path d='M0 13h16v3H0v-3Zm1 1v1h14v-1H1ZM0 3l8-3 8 3v2H0V3Zm1 .66V4h14v-.34L8 1.087 1 3.659ZM3 6h1v6H3V6Zm3 0h1v6H6V6Zm3 0h1v6H9V6Zm3 0h1v6h-1V6Z' />
    </svg>
  )
})

SvgBankWire16.displayName = 'SvgBankWire16'
export default SvgBankWire16
