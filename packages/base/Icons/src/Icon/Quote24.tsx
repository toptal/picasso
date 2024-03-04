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
  name: 'PicassoSvgQuote24',
})
const SvgQuote24 = forwardRef(function SvgQuote24(
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
      <path d='M7 4a4 4 0 0 1 4 4l-.001.052-.002.32c-.08 3.624-1.683 7.313-4.79 11.065l-.326.388-.76-.65c2.384-2.79 3.89-5.516 4.528-8.179A4 4 0 1 1 7 4Zm0 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm10-1a4 4 0 0 1 4 4l-.001.052-.002.32c-.08 3.624-1.683 7.313-4.79 11.065l-.326.388-.76-.65c2.385-2.79 3.89-5.516 4.528-8.179A4 4 0 1 1 17 4Zm0 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z' />
    </svg>
  )
})

SvgQuote24.displayName = 'SvgQuote24'
export default SvgQuote24
