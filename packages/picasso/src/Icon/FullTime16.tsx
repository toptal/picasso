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
const useStyles = makeStyles(styles, { name: 'PicassoSvgFullTime16' })
const SvgFullTime16 = forwardRef(function SvgFullTime16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const { className, style = {}, color, scale, base } = props
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
    >
      <path d='M7.5 0a7.5 7.5 0 017.484 8H13.98a6.5 6.5 0 10-5.98 5.98v1.004A7.5 7.5 0 117.5 0zm4.12 9.615c.935 0 1.335.88 1.335 1.72s-.4 1.725-1.335 1.725c-.935 0-1.335-.885-1.335-1.725 0-.84.4-1.72 1.335-1.72zm-2.125.05v2.065h.445v.515h-.445V13H8.91v-.755H7.32v-.47l1.37-2.11h.805zm4.53 0v1.25c.16-.19.475-.39.855-.39.52 0 .78.27.78.765V13h-.525v-1.52c0-.375-.195-.49-.49-.49a.811.811 0 00-.62.325V13H13.5V9.665h.525zm-2.405.47c-.545 0-.74.565-.74 1.2s.195 1.205.74 1.205c.545 0 .74-.57.74-1.205 0-.635-.195-1.2-.74-1.2zm-2.71.055l-1.015 1.54H8.91v-1.54zM8 2v6H4V7h3V2h1z' />
    </svg>
  )
})

SvgFullTime16.displayName = 'SvgFullTime16'
export default SvgFullTime16
