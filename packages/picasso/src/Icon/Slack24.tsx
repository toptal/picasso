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
const useStyles = makeStyles(styles, { name: 'PicassoSvgSlack24' })
const SvgSlack24 = forwardRef(function SvgSlack24(
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
      <path d='M5.042 15.166a2.527 2.527 0 01-2.52 2.521A2.527 2.527 0 010 15.167a2.527 2.527 0 012.521-2.522h2.521v2.521zm1.27 0a2.527 2.527 0 012.522-2.521 2.527 2.527 0 012.521 2.521v6.313A2.527 2.527 0 018.834 24a2.527 2.527 0 01-2.521-2.521v-6.313zM8.835 5.042a2.527 2.527 0 01-2.521-2.52A2.527 2.527 0 018.833 0a2.527 2.527 0 012.522 2.521v2.521H8.834zm0 1.27a2.527 2.527 0 012.521 2.522 2.527 2.527 0 01-2.521 2.521H2.52A2.527 2.527 0 010 8.834a2.527 2.527 0 012.521-2.521h6.313zm10.124 2.522a2.527 2.527 0 012.52-2.521A2.527 2.527 0 0124 8.833a2.527 2.527 0 01-2.521 2.522h-2.521V8.834zm-1.27 0a2.527 2.527 0 01-2.522 2.521 2.527 2.527 0 01-2.521-2.521V2.52A2.527 2.527 0 0115.166 0a2.527 2.527 0 012.521 2.521v6.313zm-2.522 10.124a2.527 2.527 0 012.521 2.52A2.527 2.527 0 0115.167 24a2.527 2.527 0 01-2.522-2.521v-2.521h2.521zm0-1.27a2.527 2.527 0 01-2.521-2.522 2.527 2.527 0 012.521-2.521h6.313A2.527 2.527 0 0124 15.166a2.527 2.527 0 01-2.521 2.521h-6.313z' />
    </svg>
  )
})

SvgSlack24.displayName = 'SvgSlack24'
export default SvgSlack24
