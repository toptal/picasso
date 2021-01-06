import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { JssProps, StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps, JssProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, { name: 'PicassoSvgSettings24' })
const SvgSettings24 = forwardRef(function SvgSettings24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const { className, style = {}, color, scale, base } = props
  const classes: Record<string, string> = useStyles()
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
      viewBox='0 0 24 24'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M7.209 19.62l-1.573 1.572-2.828-2.828 1.572-1.573A8.948 8.948 0 013.223 14H1v-4h2.223A8.948 8.948 0 014.38 7.209L2.808 5.636l2.828-2.828L7.209 4.38A8.948 8.948 0 0110 3.223V1h4v2.223a8.948 8.948 0 012.791 1.157l1.573-1.572 2.828 2.828-1.572 1.573c.533.845.929 1.786 1.157 2.791H23v4h-2.223a8.948 8.948 0 01-1.157 2.791l1.572 1.573-2.828 2.828-1.573-1.572A8.948 8.948 0 0114 20.777V23h-4v-2.223a8.948 8.948 0 01-2.791-1.157zm-.143-1.272l.676.426c.76.48 1.598.828 2.48 1.028l.778.176V22h2v-2.022l.779-.176a7.947 7.947 0 002.48-1.028l.675-.426 1.43 1.43 1.414-1.414-1.43-1.43.426-.676a7.947 7.947 0 001.028-2.48l.176-.778H22v-2h-2.022l-.176-.779a7.947 7.947 0 00-1.028-2.48l-.426-.675 1.43-1.43-1.414-1.414-1.43 1.43-.676-.426a7.947 7.947 0 00-2.48-1.028L13 4.022V2h-2v2.022l-.779.176c-.881.2-1.718.549-2.48 1.028l-.675.426-1.43-1.43-1.414 1.414 1.43 1.43-.426.676a7.947 7.947 0 00-1.028 2.48L4.022 11H2v2h2.022l.176.779c.2.881.549 1.718 1.028 2.48l.426.675-1.43 1.43 1.414 1.414 1.43-1.43zM12 17a5 5 0 110-10 5 5 0 010 10zm0-1a4 4 0 100-8 4 4 0 000 8z' />
    </svg>
  )
})

SvgSettings24.displayName = 'SvgSettings24'
export default SvgSettings24
