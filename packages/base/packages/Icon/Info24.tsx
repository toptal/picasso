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
  name: 'PicassoSvgInfo24',
})
const SvgInfo24 = forwardRef(function SvgInfo24(
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
        d='M11.5 22C17.299 22 22 17.299 22 11.5S17.299 1 11.5 1 1 5.701 1 11.5 5.701 22 11.5 22Zm0-1a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM12 9v7h1v1h-3v-1h1v-6h-1V9h2Zm0-2V6h-1v1h1Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgInfo24.displayName = 'SvgInfo24'
export default SvgInfo24
