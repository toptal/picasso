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
const useStyles = makeStyles(styles, { name: 'PicassoSvgMicrophoneOff16' })
const SvgMicrophoneOff16 = forwardRef(function SvgMicrophoneOff16(
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
      viewBox='0 0 16 16'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M5.497 12.624l.79-.79A4.504 4.504 0 0012 7.5h1a5.5 5.5 0 01-5 5.478V15h3v1H4v-1h3v-2.022a5.468 5.468 0 01-1.503-.354zm-2.406-1.836A5.476 5.476 0 012 7.5h1c0 .956.298 1.843.807 2.572l-.716.716zm7.862-7.862L10 3.879V3.5a2.5 2.5 0 00-5 0v4c0 .401.094.78.262 1.116l-.734.734A3.484 3.484 0 014 7.5v-4a3.5 3.5 0 016.953-.574zM11 7.12V7.5a3.5 3.5 0 01-3.86 3.482l1.09-1.09a2.506 2.506 0 001.662-1.663L11 7.121zm-9.5 8.086L.793 14.5 14.5.793l.707.707L1.5 15.207z' />
    </svg>
  )
})

SvgMicrophoneOff16.displayName = 'SvgMicrophoneOff16'
export default SvgMicrophoneOff16
