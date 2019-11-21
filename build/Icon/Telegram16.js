import React, { forwardRef } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 16
const SvgTelegram16 = forwardRef(function SvgTelegram16(props, ref) {
  const {
    classes: availableClasses,
    className,
    style = {},
    color,
    scale,
    base
  } = props
  const classes = [availableClasses.root, className]
  let svgColor
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const colorClassName = kebabToCamelCase(`${color}`)
  if (!availableClasses[`${colorClassName}`]) {
    svgColor = color
  } else {
    classes.push(availableClasses[colorClassName])
  }
  const svgStyle = Object.assign(
    { minWidth: `${scaledSize}px`, minHeight: `${scaledSize}px` },
    style
  )
  return React.createElement(
    'svg',
    {
      viewBox: '0 0 16 16',
      className: cx(...classes),
      style: svgStyle,
      color: svgColor,
      ref: ref
    },
    React.createElement('path', {
      d:
        'M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3.929 5.48l-1.313 6.188c-.097.438-.358.545-.722.338l-2-1.474-.965.93c-.106.106-.197.196-.403.196l.142-2.035 3.706-3.349c.161-.142-.035-.222-.248-.08l-4.58 2.883-1.975-.616c-.43-.135-.439-.429.09-.635l7.713-2.974c.358-.13.671.087.555.629z'
    })
  )
})
SvgTelegram16.displayName = 'SvgTelegram16'
export default withStyles(styles)(SvgTelegram16)
//# sourceMappingURL=Telegram16.js.map
