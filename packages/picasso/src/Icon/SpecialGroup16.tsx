import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
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
const SvgSpecialGroup16 = forwardRef(function SvgSpecialGroup16(
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
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const colorClassName = kebabToCamelCase(`${color}`)

  if (availableClasses[colorClassName]) {
    classes.push(availableClasses[colorClassName])
  }

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style
  }

  return (
    <svg
      viewBox='0 0 16 16'
      className={cx(...classes)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M13.754 5.423a3 3 0 10-3.508 0 4.002 4.002 0 00-1.978 2.171h-.536a4.002 4.002 0 00-1.978-2.171 3 3 0 10-3.508 0A3.991 3.991 0 000 9h1a2.996 2.996 0 015.991-.086l-.542 1.098-2.464.358a.5.5 0 00-.277.853l1.783 1.738-.42 2.454a.5.5 0 00.725.528L8 14.783l2.204 1.16a.5.5 0 00.726-.527l-.421-2.455 1.783-1.738a.5.5 0 00-.277-.853l-2.464-.358-.542-1.098A2.996 2.996 0 0115 9h1a3.991 3.991 0 00-2.246-3.577zM2 3a2 2 0 112 2 2.002 2.002 0 01-2-2zm8.869 8.214l-1.246 1.214a.5.5 0 00-.144.443l.294 1.715-1.54-.81a.5.5 0 00-.465 0l-1.54.81.294-1.715a.5.5 0 00-.144-.443L5.13 11.214l1.723-.25a.5.5 0 00.376-.274L8 9.13l.77 1.56a.5.5 0 00.376.274zM10 3a2 2 0 112 2 2.002 2.002 0 01-2-2z' />
    </svg>
  )
})

SvgSpecialGroup16.displayName = 'SvgSpecialGroup16'
export default withStyles(styles)(SvgSpecialGroup16)
