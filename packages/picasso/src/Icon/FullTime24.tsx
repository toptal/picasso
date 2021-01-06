import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, { name: 'PicassoSvgFullTime24' })
const SvgFullTime24 = forwardRef(function SvgFullTime24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    className,
    style = {},
    color,
    scale,
    base,
    classes: externalClasses
  } = props
  const classes: Record<string, string> = useStyles({
    classes: externalClasses
  })
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
      <path d='M11.5 1C17.299 1 22 5.701 22 11.5c0 .168-.004.335-.012.5h-1A9.5 9.5 0 1012 20.987v1.001c-.166.008-.333.012-.501.012C5.701 22 1 17.299 1 11.5S5.701 1 11.5 1zm6.368 13.261c1.309 0 1.869 1.232 1.869 2.408s-.56 2.415-1.869 2.415-1.869-1.239-1.869-2.415.56-2.408 1.869-2.408zm-2.975.07v2.891h.623v.721h-.623V19h-.819v-1.057h-2.226v-.658l1.918-2.954h1.127zm6.342 0v1.75a1.616 1.616 0 011.197-.546c.728 0 1.092.378 1.092 1.071V19h-.735v-2.128c0-.525-.273-.686-.686-.686-.371 0-.693.224-.868.455V19H20.5v-4.669h.735zm-3.367.658c-.763 0-1.036.791-1.036 1.68 0 .889.273 1.687 1.036 1.687s1.036-.798 1.036-1.687-.273-1.68-1.036-1.68zm-3.794.077l-1.421 2.156h1.421v-2.156zM12 4v8H6v-1h5V4h1z' />
    </svg>
  )
})

SvgFullTime24.displayName = 'SvgFullTime24'
export default SvgFullTime24
