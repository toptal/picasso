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
  name: 'PicassoSvgReferralPartners16',
})
const SvgReferralPartners16 = forwardRef(function SvgReferralPartners16(
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
      <path d='M5.75 5.42C6.5 4.87 7 3.99 7 3c0-1.65-1.35-3-3-3S1 1.35 1 3c0 1 .49 1.88 1.25 2.42C.93 6.07 0 7.42 0 9h1c0-1.65 1.35-3 3-3s3 1.35 3 3h1c0-1.57-.92-2.92-2.25-3.58ZM4 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Zm9.75 7.42C14.5 11.87 15 10.99 15 10c0-1.65-1.35-3-3-3s-3 1.35-3 3c0 1 .49 1.88 1.25 2.42C8.93 13.07 8 14.42 8 16h1c0-1.65 1.35-3 3-3s3 1.35 3 3h1c0-1.57-.92-2.92-2.25-3.58ZM12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Zm-9-1H2v3h5v-1H3v-2zm10-6h1V2H9v1h4v2z' />
    </svg>
  )
})

SvgReferralPartners16.displayName = 'SvgReferralPartners16'
export default SvgReferralPartners16
