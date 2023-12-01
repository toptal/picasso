/* eslint-disable import/no-extraneous-dependencies */
import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import type { StandardProps } from '@toptal/picasso-shared'
import kebabToCamelCase from '@toptal/picasso-utils/kebab-to-camel-case'

import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgPieChart16',
})
const SvgPieChart16 = forwardRef(function SvgPieChart16(
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
      <path d='M8 1v7h7v.5a7.5 7.5 0 1 1-7.743-7.496L7.5 1H8ZM7 2.019l-.193.018a6.5 6.5 0 1 0 7.128 7.388l.028-.232L13.98 9H7V2.019ZM9.5 0a6.5 6.5 0 0 1 6.496 6.267L16 6.5V7H9V0h.5Zm.499 1.023V6h4.977l-.015-.157a5.503 5.503 0 0 0-4.57-4.771l-.234-.033-.158-.016Z' />
    </svg>
  )
})

SvgPieChart16.displayName = 'SvgPieChart16'
export default SvgPieChart16
