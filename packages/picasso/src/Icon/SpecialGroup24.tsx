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
const useStyles = makeStyles(styles, { name: 'PicassoSvgSpecialGroup24' })
const SvgSpecialGroup24 = forwardRef(function SvgSpecialGroup24(
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
      viewBox='0 0 24 24'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M18 0a4 4 0 012.126 7.389 6 6 0 013.87 5.386L24 13h-1a5 5 0 00-9.995-.217L13 13h-.013l1.07 2.168 3.598.523a.5.5 0 01.277.853l-2.603 2.538.614 3.583a.5.5 0 01-.725.527L12 21.5l-3.218 1.692a.5.5 0 01-.725-.527l.614-3.583-2.603-2.538a.5.5 0 01.277-.853l3.598-.523L11.012 13H11a5 5 0 00-9.995-.217L1 13H0a6.002 6.002 0 013.874-5.612 4 4 0 114.252.001 6.007 6.007 0 013.723 4.266.481.481 0 01.302-.002 6.013 6.013 0 013.723-4.265A4 4 0 0118 0zm-6 13.26l-1.393 2.822-3.115.452 2.254 2.198-.533 3.102L12 20.37l2.786 1.464-.532-3.102 2.253-2.198-3.114-.452L12 13.26zM6 1a3 3 0 100 6 3 3 0 000-6zm12 0a3 3 0 100 6 3 3 0 000-6z' />
    </svg>
  )
})

SvgSpecialGroup24.displayName = 'SvgSpecialGroup24'
export default SvgSpecialGroup24
