/* eslint-disable import/no-extraneous-dependencies */
import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import type { StandardProps } from '@toptal/picasso-shared'
import kebabToCamelCase from '@toptal/picasso-utils/kebab-to-camel-case'

import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgPod24',
})
const SvgPod24 = forwardRef(function SvgPod24(
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
      <path d='M6 13a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm12 0a5 5 0 1 1 0 10 5 5 0 0 1 0-10ZM6 14a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm12 0a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM6 1a5 5 0 1 1 0 10A5 5 0 0 1 6 1Zm12 0a5 5 0 1 1 0 10 5 5 0 0 1 0-10ZM6 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm12 0a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z' />
    </svg>
  )
})

SvgPod24.displayName = 'SvgPod24'
export default SvgPod24
