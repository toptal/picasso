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
const useStyles = makeStyles(styles, { name: 'PicassoSvgNewCandidate24' })
const SvgNewCandidate24 = forwardRef(function SvgNewCandidate24(
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
      <path d='M20 4V1h1v3h3v1h-3v3h-1V5h-3V4h3zM6.235 14.433A7.002 7.002 0 019 1a7 7 0 012.765 13.433A9.004 9.004 0 0118 23h-1a8 8 0 10-16 0H0c0-4.006 2.617-7.4 6.235-8.567zM9 14A6 6 0 109 2a6 6 0 000 12z' />
    </svg>
  )
})

SvgNewCandidate24.displayName = 'SvgNewCandidate24'
export default SvgNewCandidate24
