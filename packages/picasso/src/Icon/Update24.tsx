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
const useStyles = makeStyles(styles, { name: 'PicassoSvgUpdate24' })
const SvgUpdate24 = forwardRef(function SvgUpdate24(
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
      <path d='M4.5 17.832V20.5h-1v-4h4v1H5.519a8.47 8.47 0 006.481 3 8.5 8.5 0 008.5-8.5h1a9.5 9.5 0 01-17 5.832zm15-11.664V3.5h1v4h-4v-1h1.981A8.47 8.47 0 0012 3.5 8.5 8.5 0 003.5 12h-1a9.5 9.5 0 0117-5.832z' />
    </svg>
  )
})

SvgUpdate24.displayName = 'SvgUpdate24'
export default SvgUpdate24
