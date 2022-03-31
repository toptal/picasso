import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgMicrophoneOn16'
})
const SvgMicrophoneOn16 = forwardRef(function SvgMicrophoneOn16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    className,
    style = {},
    color,
    scale,
    base,
    'data-testid': testId
  } = props
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
      viewBox='0 0 16 16'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M7 15v-2.022A5.5 5.5 0 0 1 2 7.5h1a4.5 4.5 0 0 0 9 0h1a5.5 5.5 0 0 1-5 5.478V15h3v1H4v-1h3Zm.5-15A3.5 3.5 0 0 1 11 3.5v4a3.5 3.5 0 0 1-7 0v-4A3.5 3.5 0 0 1 7.5 0Zm0 1A2.5 2.5 0 0 0 5 3.5v4a2.5 2.5 0 0 0 5 0v-4A2.5 2.5 0 0 0 7.5 1Z' />
    </svg>
  )
})

SvgMicrophoneOn16.displayName = 'SvgMicrophoneOn16'
export default SvgMicrophoneOn16
