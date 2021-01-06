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
const useStyles = makeStyles(styles, { name: 'PicassoSvgMicrophoneOn24' })
const SvgMicrophoneOn24 = forwardRef(function SvgMicrophoneOn24(
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
      <path d='M11 23v-3.016A7.5 7.5 0 014 12.5h1a6.5 6.5 0 1013 0h1a7.5 7.5 0 01-7 7.484V23h5v1H6v-1h5zm.5-23A4.5 4.5 0 0116 4.5v8a4.5 4.5 0 11-9 0v-8A4.5 4.5 0 0111.5 0zm0 1A3.5 3.5 0 008 4.5v8a3.5 3.5 0 007 0v-8A3.5 3.5 0 0011.5 1z' />
    </svg>
  )
})

SvgMicrophoneOn24.displayName = 'SvgMicrophoneOn24'
export default SvgMicrophoneOn24
