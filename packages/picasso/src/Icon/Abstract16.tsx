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
const useStyles = makeStyles(styles, { name: 'PicassoSvgAbstract16' })
const SvgAbstract16 = forwardRef(function SvgAbstract16(
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
      <path d='M8 0c6.4 0 8 1.6 8 8s-1.6 8-8 8-8-1.6-8-8 1.6-8 8-8zm-.1 6.5c-1.2-.5-2.5-.2-3.4.6-.9.9-1.1 2.2-.6 3.4.4 1.1 1.5 1.9 2.8 1.9 1.7 0 3-1.4 3.1-3.1C9.8 8.1 9 7 7.9 6.5zm4.4-2.7H3.8v1.5h7v7h1.5V3.8zm-5.6 4c.8 0 1.5.7 1.6 1.5 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6 0-.9.7-1.5 1.6-1.5z' />
    </svg>
  )
})

SvgAbstract16.displayName = 'SvgAbstract16'
export default SvgAbstract16
