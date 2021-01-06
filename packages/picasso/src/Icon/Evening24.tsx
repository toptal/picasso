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
const useStyles = makeStyles(styles, { name: 'PicassoSvgEvening24' })
const SvgEvening24 = forwardRef(function SvgEvening24(
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
      viewBox='0 0 24 24'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M19 16v-1h1v1h1v1h-1v1h-1v-1h-1v-1h1zm-9-3v-1h1v1h1v1h-1v1h-1v-1H9v-1h1zm7-4V7h1v2h2v1h-2v2h-1v-2h-2V9h2zM5 17v-2h1v2h2v1H6v2H5v-2H3v-1h2zM9 6h2v1H9v2H8V7H6V6h2V4h1v2z' />
    </svg>
  )
})

SvgEvening24.displayName = 'SvgEvening24'
export default SvgEvening24
