import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { StandardProps, mergeClasses } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, { name: 'PicassoSvgReferral16' })
const SvgReferral16 = forwardRef(function SvgReferral16(
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
      viewBox='0 0 16 16'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M4 7a3 3 0 011.777 5.418A3.994 3.994 0 017.995 15.8L8 16H7a3 3 0 00-5.995-.176L1 16H0a4 4 0 012.223-3.585A3 3 0 014 7zm0 1a2 2 0 100 4 2 2 0 000-4zm8-8v1h.5a2.5 2.5 0 012.495 2.336L15 3.5h-1a1.5 1.5 0 00-1.356-1.493L12.5 2H12v3h.5a2.5 2.5 0 01.164 4.995L12.5 10H12v1h-1v-1h-.5a2.5 2.5 0 01-2.495-2.336L8 7.5h1a1.5 1.5 0 001.356 1.493L10.5 9h.5V6h-.5a2.5 2.5 0 01-.164-4.995L10.5 1h.5V0h1zm.5 6H12v3h.5a1.5 1.5 0 00.144-2.993L12.5 6zM11 2h-.5a1.5 1.5 0 00-.144 2.993L10.5 5h.5V2z' />
    </svg>
  )
})

SvgReferral16.displayName = 'SvgReferral16'
export default SvgReferral16
