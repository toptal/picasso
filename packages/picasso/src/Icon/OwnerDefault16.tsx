import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { JssProps, StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps, JssProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, { name: 'PicassoSvgOwnerDefault16' })
const SvgOwnerDefault16 = forwardRef(function SvgOwnerDefault16(
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
      viewBox='0 0 16 16'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M8 6a3 3 0 013 3h2a3 3 0 013 3v1a3 3 0 01-3 3H8a3 3 0 01-3-3H3a3 3 0 01-3-3V9a3 3 0 013-3h5zm5 4h-2a3 3 0 01-3 3H6a2 2 0 002 2h5a2 2 0 002-2v-1a2 2 0 00-2-2zM8 7H3a2 2 0 00-2 2v1a2 2 0 002 2h2a3 3 0 013-3h2a2 2 0 00-2-2zm2 3H8a2 2 0 00-2 2h2a2 2 0 002-2zm4-9v2h2v1h-2v2h-1V4h-2V3h2V1h1z' />
    </svg>
  )
})

SvgOwnerDefault16.displayName = 'SvgOwnerDefault16'
export default SvgOwnerDefault16
