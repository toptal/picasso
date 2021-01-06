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
const useStyles = makeStyles(styles, { name: 'PicassoSvgLink24' })
const SvgLink24 = forwardRef(function SvgLink24(
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
      <path d='M4 15a4 4 0 01-4-4V9a4 4 0 014-4h9a4 4 0 014 4h3a4 4 0 014 4v2a4 4 0 01-4 4h-9a4 4 0 01-4-4H4zm16-5h-3v1a4 4 0 01-4 4H8a3 3 0 003 3h9a3 3 0 003-3v-2a3 3 0 00-3-3zm-7-4H4a3 3 0 00-3 3v2a3 3 0 003 3h3v-1a4 4 0 014-4h5a3 3 0 00-3-3zm3 4h-5a3 3 0 00-3 3v1h5a3 3 0 003-3v-1z' />
    </svg>
  )
})

SvgLink24.displayName = 'SvgLink24'
export default SvgLink24
