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
  name: 'PicassoSvgAttachment24',
})
const SvgAttachment24 = forwardRef(function SvgAttachment24(
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
        d='M19.63 3.366a6.5 6.5 0 0 0-9.193 0L4.073 9.73l.707.707 6.364-6.364.16-.153a5.5 5.5 0 0 1 7.618 7.931l-6.363 6.364-2.122 2.122-.14.132a3.5 3.5 0 0 1-4.81-5.082l2.122-2.121 6.364-6.364.107-.098a1.5 1.5 0 0 1 2.014 2.219L9.73 15.387l.707.707 6.364-6.364.113-.12a2.5 2.5 0 0 0-3.648-3.415l-6.364 6.364-2.122 2.12-.146.154a4.5 4.5 0 0 0 6.51 6.21l2.122-2.12 6.364-6.364.162-.168a6.5 6.5 0 0 0-.162-9.025Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgAttachment24.displayName = 'SvgAttachment24'
export default SvgAttachment24
