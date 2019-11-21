import React, { forwardRef } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 24
const SvgSlack24 = forwardRef(function SvgSlack24(props, ref) {
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
      viewBox: '0 0 24 24',
      className: cx(...classes),
      style: svgStyle,
      color: svgColor,
      ref: ref
    },
    React.createElement('path', {
      d:
        'M5.042 15.166a2.527 2.527 0 0 1-2.52 2.521A2.527 2.527 0 0 1 0 15.167a2.527 2.527 0 0 1 2.521-2.522h2.521v2.521zm1.27 0a2.527 2.527 0 0 1 2.522-2.521 2.527 2.527 0 0 1 2.521 2.521v6.313A2.527 2.527 0 0 1 8.834 24a2.527 2.527 0 0 1-2.521-2.521v-6.313zM8.835 5.042a2.527 2.527 0 0 1-2.521-2.52A2.527 2.527 0 0 1 8.833 0a2.527 2.527 0 0 1 2.522 2.521v2.521H8.834zm0 1.27a2.527 2.527 0 0 1 2.521 2.522 2.527 2.527 0 0 1-2.521 2.521H2.52A2.527 2.527 0 0 1 0 8.834a2.527 2.527 0 0 1 2.521-2.521h6.313zm10.124 2.522a2.527 2.527 0 0 1 2.52-2.521A2.527 2.527 0 0 1 24 8.833a2.527 2.527 0 0 1-2.521 2.522h-2.521V8.834zm-1.27 0a2.527 2.527 0 0 1-2.522 2.521 2.527 2.527 0 0 1-2.521-2.521V2.52A2.527 2.527 0 0 1 15.166 0a2.527 2.527 0 0 1 2.521 2.521v6.313zm-2.522 10.124a2.527 2.527 0 0 1 2.521 2.52A2.527 2.527 0 0 1 15.167 24a2.527 2.527 0 0 1-2.522-2.521v-2.521h2.521zm0-1.27a2.527 2.527 0 0 1-2.521-2.522 2.527 2.527 0 0 1 2.521-2.521h6.313A2.527 2.527 0 0 1 24 15.166a2.527 2.527 0 0 1-2.521 2.521h-6.313z'
    })
  )
})
SvgSlack24.displayName = 'SvgSlack24'
export default withStyles(styles)(SvgSlack24)
//# sourceMappingURL=Slack24.js.map
