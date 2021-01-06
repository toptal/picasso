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
const useStyles = makeStyles(styles, { name: 'PicassoSvgGlobe16' })
const SvgGlobe16 = forwardRef(function SvgGlobe16(
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
      <path d='M1.019 8a6.505 6.505 0 004.508 5.695C4.665 12.432 4.08 10.366 4.007 8H1.02zm0-1h2.989c.072-2.366.657-4.432 1.519-5.695A6.505 6.505 0 001.019 7zM13.98 7a6.505 6.505 0 00-4.508-5.695c.862 1.263 1.447 3.329 1.52 5.695h2.988zm0 1h-2.989c-.072 2.366-.657 4.432-1.519 5.695A6.505 6.505 0 0013.981 8zM5.008 8c.114 3.412 1.373 6 2.492 6s2.378-2.588 2.492-6H5.008zm0-1h4.984C9.878 3.588 8.619 1 7.5 1S5.122 3.588 5.008 7zM7.5 15a7.5 7.5 0 110-15 7.5 7.5 0 010 15z' />
    </svg>
  )
})

SvgGlobe16.displayName = 'SvgGlobe16'
export default SvgGlobe16
