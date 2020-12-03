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
const useStyles = makeStyles(styles, { name: 'PicassoSvgChevronRight24' })
const SvgChevronRight24 = forwardRef(function SvgChevronRight24(
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
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M15.5 10.793l.707.707L9.5 18.207l-.707-.707 6-6-6-6 .707-.707 6 6z' />
    </svg>
  )
})

SvgChevronRight24.displayName = 'SvgChevronRight24'
export default SvgChevronRight24
