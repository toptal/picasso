import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import { StandardProps, ColorType } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: ColorType | string
  base?: number
}
const SvgSkype24 = forwardRef(function SvgSkype24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
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

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style
  }

  return (
    <svg
      viewBox='0 0 24 24'
      className={cx(...classes)}
      style={svgStyle}
      color={svgColor}
      ref={ref}
    >
      <path d='M22.11 14.469a5.512 5.512 0 0 1-.737 6.913 5.57 5.57 0 0 1-6.982.704 10.447 10.447 0 0 1-9.739-2.8 10.34 10.34 0 0 1-2.736-9.715 5.512 5.512 0 0 1 .711-6.953 5.57 5.57 0 0 1 6.98-.705c3.503-.82 7.194.217 9.75 2.76a10.34 10.34 0 0 1 2.754 9.796zm-.97-.238a9.34 9.34 0 0 0-2.49-8.848 9.447 9.447 0 0 0-8.814-2.497l-.419.098-.359-.236a4.57 4.57 0 0 0-5.725.58 4.512 4.512 0 0 0-.584 5.69l.24.363-.101.423A9.34 9.34 0 0 0 5.36 18.58a9.447 9.447 0 0 0 8.807 2.532l.416-.096.357.235a4.57 4.57 0 0 0 5.727-.578 4.512 4.512 0 0 0 .605-5.659l-.236-.363.103-.42zm-13.587.993l-.224-.447.894-.448.224.447A3.12 3.12 0 0 0 11.24 16.5h2.26a2 2 0 0 0 0-4h-3a3 3 0 1 1 0-6h2.26a4.12 4.12 0 0 1 3.687 2.276l.224.447-.894.448-.224-.447A3.12 3.12 0 0 0 12.76 7.5H10.5a2 2 0 0 0 0 4h3a3 3 0 1 1 0 6h-2.26a4.12 4.12 0 0 1-3.687-2.276z' />
    </svg>
  )
})

SvgSkype24.displayName = 'SvgSkype24'
export default withStyles(styles)(SvgSkype24)
