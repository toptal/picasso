import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { StandardProps, mergeClasses } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, { name: 'PicassoSvgJobChange24' })
const SvgJobChange24 = forwardRef(function SvgJobChange24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    classes: externalClasses,
    className,
    style = {},
    color,
    scale,
    base
  } = props
  const classes: Record<string, string> = mergeClasses(
    useStyles(props),
    externalClasses
  )
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
      viewBox='0 0 24 24'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M14 12v1H1v5h13v1H0V6h7V3h6v3h7v5h-1V7H1v5h13zM8 6h4V4H8v2zm11.5 10.793l2-2 .707.707-2 2-.707.707-1.707-1.707.707-.707 1 1zm0 4.207a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm0-1a3.5 3.5 0 100-7 3.5 3.5 0 000 7z' />
    </svg>
  )
})

SvgJobChange24.displayName = 'SvgJobChange24'
export default SvgJobChange24
