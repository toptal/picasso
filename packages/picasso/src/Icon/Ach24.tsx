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
  name: 'PicassoSvgAch24',
})
const SvgAch24 = forwardRef(function SvgAch24(
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
        d='m15.5 1.793.354.354 4 4 .353.353-.353.354-12 12-.147.146H3v-4.707l.146-.146 12-12 .354-.354ZM4 14.707V18h3.293l9-9L13 5.707l-9 9ZM13.707 5 17 8.293 18.793 6.5 15.5 3.207 13.707 5ZM1.64 9a.64.64 0 0 0-.64.64v10.73c0 .354.286.64.64.64h20.72a.64.64 0 0 0 .64-.64V9.64a.64.64 0 0 0-.64-.64H20V8h2.36c.906 0 1.64.734 1.64 1.64v10.73a1.64 1.64 0 0 1-1.64 1.64H1.64A1.64 1.64 0 0 1 0 20.37V9.64C0 8.734.734 8 1.64 8H6v1H1.64ZM21 16h-7v-1h7v1Zm-10 3h10v-1H11v1Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgAch24.displayName = 'SvgAch24'
export default SvgAch24
