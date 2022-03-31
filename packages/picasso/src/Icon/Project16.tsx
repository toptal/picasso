import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgProject16'
})
const SvgProject16 = forwardRef(function SvgProject16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    className,
    style = {},
    color,
    scale,
    base,
    'data-testid': testId
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
    ...style
  }

  return (
    <svg
      viewBox='0 0 16 16'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M16 0v16H0V0h16Zm-1 1H1v14h14V1Zm-1 13H2V7h12v7Zm-1-1v-2h-2v2h2Zm-3-2H6v2h4v-2Zm-5 0H3v2h2v-2Zm8-1V8h-2v2h2Zm-3-2H6v2h4V8ZM5 8H3v2h2V8Zm2-4v1H2V4h5ZM6 2v1H2V2h4Z' />
    </svg>
  )
})

SvgProject16.displayName = 'SvgProject16'
export default SvgProject16
