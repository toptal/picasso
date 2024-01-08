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
  name: 'PicassoSvgCreditCard24',
})
const SvgCreditCard24 = forwardRef(function SvgCreditCard24(
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
        d='M1.64 5.214c-.36 0-.64.286-.64.626v2.322h22V5.84c0-.34-.28-.626-.64-.626H1.64ZM1 18.394V9.162h22v9.232c0 .34-.28.626-.64.626H1.64a.633.633 0 0 1-.64-.626Zm23 0V5.84c0-.904-.74-1.626-1.64-1.626H1.64C.74 4.214 0 4.936 0 5.84v12.554c0 .904.74 1.626 1.64 1.626h20.72c.9 0 1.64-.722 1.64-1.626ZM3 13.111h7v-1H3v1Zm4 2.96H3v-1h4v1Zm10-2.96h4v-1h-4v1Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgCreditCard24.displayName = 'SvgCreditCard24'
export default SvgCreditCard24
