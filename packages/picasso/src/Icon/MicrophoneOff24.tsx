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
const useStyles = makeStyles(styles, { name: 'PicassoSvgMicrophoneOff24' })
const SvgMicrophoneOff24 = forwardRef(function SvgMicrophoneOff24(
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
      <path d='M7.364 18.757l.724-.724A6.5 6.5 0 0018 12.5h1a7.5 7.5 0 01-7 7.484V23h5v1H6v-1h5v-3.016a7.458 7.458 0 01-3.636-1.227zm-2.121-2.12A7.465 7.465 0 014 12.5h1c0 1.251.354 2.42.967 3.412l-.724.724zM16 5.878l-1 1V4.5a3.5 3.5 0 00-7 0v8c0 .413.071.809.203 1.176l-.764.764A4.482 4.482 0 017 12.5v-8a4.5 4.5 0 019 0v1.379zm0 4.242V12.5a4.5 4.5 0 01-6.44 4.061l.764-.764A3.5 3.5 0 0015 12.5v-1.379l1-1zM2.5 22.207l-.707-.707L21.5 1.793l.707.707L2.5 22.207z' />
    </svg>
  )
})

SvgMicrophoneOff24.displayName = 'SvgMicrophoneOff24'
export default SvgMicrophoneOff24
