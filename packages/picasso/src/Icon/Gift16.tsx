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
const useStyles = makeStyles(styles, { name: 'PicassoSvgGift16' })
const SvgGift16 = forwardRef(function SvgGift16(
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
      xmlns='http://www.w3.org/2000/svg'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M11.353.22c.289.134.496.252.661.379.2.153.332.313.463.537.039.066.031.052.146.266.234.436.234.91.01 1.379l-.107.145L11.37 4H16v5h-1.067v7H1.067l-.001-7H0V4h4.643L3.489 2.926l-.086-.106c-.269-.448-.269-.939-.011-1.418.29-.541.762-.946 1.27-1.183.343-.16.796-.16 1.381-.04L6.3.31l1.708 1.592L9.697.329c.402-.418.993-.418 1.656-.11zM7.466 9H2.133v5.933h5.333V9zm6.4 0H8.533v5.933h5.334L13.866 9zm-6.4-4h-6.4v3h6.4V5zm7.467 0h-6.4v3h6.4V5zM10.45.993L8.533 2.777V4h1.37l1.814-1.688a.54.54 0 00-.022-.478c-.105-.196-.1-.185-.13-.236a.77.77 0 00-.212-.254 2.547 2.547 0 00-.464-.26c-.292-.136-.394-.136-.439-.09zm-5.324.09c-.318.149-.623.41-.806.75-.096.18-.106.321-.039.464L6.111 4h1.355V2.763l-1.79-1.667c-.292-.049-.481-.045-.55-.012z' />
    </svg>
  )
})

SvgGift16.displayName = 'SvgGift16'
export default SvgGift16
