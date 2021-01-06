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
const useStyles = makeStyles(styles, { name: 'PicassoSvgAch16' })
const SvgAch16 = forwardRef(function SvgAch16(
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
      viewBox='0 0 16 16'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M12 7V6h2.5A1.5 1.5 0 0116 7.5v6a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 010 13.5v-6A1.5 1.5 0 011.5 6H3v1H1.5a.5.5 0 00-.5.5v6a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-6a.5.5 0 00-.5-.5H12zm-3 3h5v1H9v-1zm-2 2h7v1H7v-1zm1.5-7.793L3 9.707V11h1.293l5.5-5.5L8.5 4.207zm.707-.707L10.5 4.793 11.793 3.5 10.5 2.207 9.207 3.5zM2 9.293l8.5-8.5L13.207 3.5l-8.5 8.5H2V9.293z' />
    </svg>
  )
})

SvgAch16.displayName = 'SvgAch16'
export default SvgAch16
