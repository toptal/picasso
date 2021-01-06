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
const useStyles = makeStyles(styles, { name: 'PicassoSvgEyeHidden16' })
const SvgEyeHidden16 = forwardRef(function SvgEyeHidden16(
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
      <path d='M14.5.793l.707.707L1.5 15.207.793 14.5 14.5.793zM13.18 4.94C14.16 5.724 15.1 6.744 16 8c-2.388 3.333-5.054 5-8 5a7.544 7.544 0 01-2.467-.412l.803-.802c.462.121.93.19 1.406.209L8 12c2.329 0 4.493-1.207 6.518-3.703L14.752 8l-.01-.015c-.739-.95-1.496-1.726-2.273-2.333l.712-.711zM8 3c.845 0 1.668.137 2.467.412l-.802.802a6.523 6.523 0 00-1.407-.209L8 4C5.671 4 3.507 5.207 1.482 7.703L1.247 8l.011.015c.739.95 1.497 1.727 2.274 2.334l-.712.71C1.84 10.278.9 9.258 0 8c2.388-3.333 5.054-5 8-5zm2.899 4.224a3.004 3.004 0 01-3.675 3.675l.902-.904h.023a2 2 0 001.847-1.869l.903-.902zM8 5c.269 0 .53.035.777.102l-.903.902-.023.001a2 2 0 00-1.847 1.87l-.902.902A3.004 3.004 0 018 5z' />
    </svg>
  )
})

SvgEyeHidden16.displayName = 'SvgEyeHidden16'
export default SvgEyeHidden16
