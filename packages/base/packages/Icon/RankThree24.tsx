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
  name: 'PicassoSvgRankThree24',
})
const SvgRankThree24 = forwardRef(function SvgRankThree24(
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
      <path d='m12 13.86 8.203 6.562-.625.78L12 15.14l-7.578 6.063-.625-.781L12 13.86Zm0-6 8.203 6.562-.625.78L12 9.14l-7.578 6.063-.625-.781L12 7.86Zm0-6 8.203 6.562-.625.78L12 3.14 4.422 9.203l-.625-.781L12 1.86Z' />
    </svg>
  )
})

SvgRankThree24.displayName = 'SvgRankThree24'
export default SvgRankThree24
