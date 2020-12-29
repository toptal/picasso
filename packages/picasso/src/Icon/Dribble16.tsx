import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { StandardProps, mergeClasses } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, { name: 'PicassoSvgDribble16' })
const SvgDribble16 = forwardRef(function SvgDribble16(
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
      viewBox='0 0 16 16'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M8 16c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm6.747-6.905c-.234-.074-2.114-.636-4.256-.292.893 2.456 1.258 4.456 1.328 4.872a6.854 6.854 0 002.93-4.58h-.002zM10.67 14.3c-.102-.6-.5-2.688-1.46-5.18l-.044.013c-3.86 1.344-5.24 4.017-5.36 4.267a6.774 6.774 0 004.193 1.444c.947 0 1.847-.193 2.667-.543l.004-.001zm-7.747-1.72c.155-.267 2.03-3.37 5.555-4.51.09-.03.18-.056.27-.08-.173-.39-.36-.778-.555-1.16-3.413 1.02-6.722.977-7.022.97l-.003.208c0 1.755.665 3.358 1.756 4.57v.002zM1.31 6.61c.307.005 3.122.017 6.318-.832a43.649 43.649 0 00-2.533-3.952 6.85 6.85 0 00-3.784 4.78l-.001.004zM6.4 1.368c.188.253 1.43 1.943 2.548 4 2.43-.91 3.46-2.293 3.582-2.468A6.793 6.793 0 008 1.176c-.55 0-1.087.067-1.6.19v.002zm6.89 2.322c-.145.193-1.29 1.662-3.816 2.693.16.327.313.657.453.991.054.12.1.24.147.353 2.273-.286 4.533.174 4.76.22a6.763 6.763 0 00-1.54-4.253l-.004-.004z' />
    </svg>
  )
})

SvgDribble16.displayName = 'SvgDribble16'
export default SvgDribble16
