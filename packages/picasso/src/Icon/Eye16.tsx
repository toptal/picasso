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
const useStyles = makeStyles(styles, { name: 'PicassoSvgEye16' })
const SvgEye16 = forwardRef(function SvgEye16(
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
      <path d='M8 3c2.946 0 5.612 1.667 8 5-2.388 3.333-5.054 5-8 5-2.946 0-5.612-1.667-8-5 2.388-3.333 5.054-5 8-5zm0 1C5.671 4 3.507 5.207 1.482 7.703L1.247 8l.011.015c2.014 2.59 4.168 3.89 6.484 3.98L8 12c2.329 0 4.493-1.207 6.518-3.703L14.752 8l-.01-.015c-2.014-2.59-4.168-3.89-6.484-3.98L8 4zm0 1a3 3 0 110 6 3 3 0 010-6zm0 1a2 2 0 100 4 2 2 0 000-4z' />
    </svg>
  )
})

SvgEye16.displayName = 'SvgEye16'
export default SvgEye16
