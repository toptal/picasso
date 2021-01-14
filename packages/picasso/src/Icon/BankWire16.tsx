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
const useStyles = makeStyles(styles, { name: 'PicassoSvgBankWire16' })
const SvgBankWire16 = forwardRef(function SvgBankWire16(
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
      <path d='M0 13h16v3H0v-3zm1 1v1h14v-1H1zM0 3l8-3 8 3v2H0V3zm1 .66V4h14v-.34L8 1.087 1 3.659zM3 6h1v6H3V6zm3 0h1v6H6V6zm3 0h1v6H9V6zm3 0h1v6h-1V6z' />
    </svg>
  )
})

SvgBankWire16.displayName = 'SvgBankWire16'
export default SvgBankWire16
