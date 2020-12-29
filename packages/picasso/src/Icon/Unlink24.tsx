import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { StandardProps, mergeClasses } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, { name: 'PicassoSvgUnlink24' })
const SvgUnlink24 = forwardRef(function SvgUnlink24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    classes: externalClasses,
    className,
    style = {},
    color,
    scale,
    base
  } = props
  const classes: Record<string, string> = mergeClasses(
    useStyles(props),
    externalClasses
  )
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
      <path d='M21.5 1.793l.707.707L2.5 22.207l-.707-.707L21.5 1.793zM20 9a4 4 0 014 4v2a4 4 0 01-4 4h-9a3.987 3.987 0 01-2.767-1.111l.708-.707A2.99 2.99 0 0011 18h9a3 3 0 003-3v-2a3 3 0 00-3-3h-3v1a4 4 0 01-4 4h-1.879l1-1H13a3 3 0 003-3v-.879L17.121 9H20zm-7-4c1.074 0 2.05.423 2.768 1.112l-.708.707A2.99 2.99 0 0013 6H4a3 3 0 00-3 3v2a3 3 0 003 3h3v-1a4 4 0 014-4h1.878l-1 1H11a3 3 0 00-3 3v.878L6.878 15H4a4 4 0 01-4-4V9a4 4 0 014-4h9z' />
    </svg>
  )
})

SvgUnlink24.displayName = 'SvgUnlink24'
export default SvgUnlink24
