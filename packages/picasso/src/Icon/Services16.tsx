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
const useStyles = makeStyles(styles, { name: 'PicassoSvgServices16' })
const SvgServices16 = forwardRef(function SvgServices16(
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
      <path d='M10 0c.88 0 1.717.19 2.47.53L9 4l.5 2.5L12 7l3.47-3.469a6 6 0 01-7.212 8.212L4 16l-4-4 4.257-4.256A6 6 0 0110 0zm0 1a5 5 0 00-4.862 6.171l.076.283.174.573L1.415 12 4 14.585l3.975-3.972.573.173A5 5 0 0015 6l-.007-.269-.024-.285-2.64 2.64L8.65 7.35 7.914 3.67l2.641-2.64-.02-.003a5.043 5.043 0 00-.266-.02L10 1z' />
    </svg>
  )
})

SvgServices16.displayName = 'SvgServices16'
export default SvgServices16
