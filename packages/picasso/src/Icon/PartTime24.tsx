import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { JssProps, StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps, JssProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, { name: 'PicassoSvgPartTime24' })
const SvgPartTime24 = forwardRef(function SvgPartTime24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const { className, style = {}, color, scale, base } = props
  const classes: Record<string, string> = useStyles()
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
      <path d='M11.5 1C17.299 1 22 5.701 22 11.5c0 .168-.004.335-.012.5h-1A9.5 9.5 0 1012 20.987v1.001c-.166.008-.333.012-.501.012C5.701 22 1 17.299 1 11.5S5.701 1 11.5 1zm6.368 13.261c1.309 0 1.869 1.232 1.869 2.408s-.56 2.415-1.869 2.415-1.869-1.239-1.869-2.415.56-2.408 1.869-2.408zm-4.312 0c.903 0 1.694.511 1.694 1.442 0 .76-.616 1.449-1.621 2.25l-.423.326h2.072V19h-3.381v-.644c1.813-1.372 2.52-1.981 2.52-2.653 0-.49-.42-.714-.847-.714-.546 0-.966.224-1.26.56l-.476-.539c.413-.497 1.071-.749 1.722-.749zm7.679.07v1.75a1.616 1.616 0 011.197-.546c.728 0 1.092.378 1.092 1.071V19h-.735v-2.128c0-.525-.273-.686-.686-.686-.371 0-.693.224-.868.455V19H20.5v-4.669h.735zm-3.367.658c-.763 0-1.036.791-1.036 1.68 0 .889.273 1.687 1.036 1.687s1.036-.798 1.036-1.687-.273-1.68-1.036-1.68zM12 4v8H6v-1h5V4h1z' />
    </svg>
  )
})

SvgPartTime24.displayName = 'SvgPartTime24'
export default SvgPartTime24
