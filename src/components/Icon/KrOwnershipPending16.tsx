import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import { StandardProps, ColorType } from '../Picasso'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: ColorType | string
  base?: number
}
const SvgKrOwnershipPending16 = forwardRef(function SvgKrOwnershipPending16(
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
      viewBox='0 0 16 16'
      className={cx(...classes)}
      style={svgStyle}
      color={svgColor}
      ref={ref}
    >
      <path
        d='M10 8.424c-.2-.2-.4-.2-.6-.3.2-.1.3-.298.5-.398.5-.499.7-1.097.6-1.795 0-1.495-1.1-2.591-2.6-2.591S5.3 4.436 5.3 5.93c0 .898.5 1.795 1.3 2.194-.2.1-.4.199-.5.199a4.164 4.164 0 0 0-2.4 3.788h1c0-1.196.7-2.293 1.8-2.89.9-.5 2.1-.5 3.1 0 1.1.498 1.8 1.694 1.8 2.79h1c0-1.495-1-2.99-2.4-3.588zM7.9 4.336c.9 0 1.6.698 1.6 1.595 0 .499-.2.798-.4.997-.3.4-.7.598-1.2.598-.8 0-1.6-.598-1.6-1.595 0-.897.7-1.595 1.6-1.595zM6.6 14.903l-.2.997c.5 0 1.1.1 1.6.1s1.1-.1 1.6-.2l-.2-.996c-.9.2-1.9.2-2.8.1zM9.4 1.146L9.6.15c-1-.2-2.2-.2-3.2 0l.2.996c.9-.1 1.9-.1 2.8 0zM.2 6.43C.1 6.928 0 7.526 0 8.025 0 8.523.1 9.12.2 9.62l1-.2C1 8.923 1 8.524 1 8.026c0-.499 0-.897.1-1.396l-.9-.2zm15.6 0l-1 .2c.2.398.2.896.2 1.395 0 .498 0 .897-.1 1.396l1 .199c0-.499.1-1.097.1-1.595 0-.598-.1-1.097-.2-1.595zM2.2 11.913l-.8.598c.3.399.6.897 1 1.196.4.399.8.698 1.2.997l.6-.797-1.2-.898c-.3-.398-.6-.797-.8-1.096zM12.4 1.346l-.5.797c.4.2.7.499 1.1.897.3.3.6.698.9 1.097l.8-.598c-.3-.399-.6-.897-1-1.196-.4-.3-.9-.698-1.3-.997zM3 3.14c.3-.299.7-.598 1.1-.897l-.5-.897c-.5.299-.9.698-1.3.997-.3.398-.7.797-1 1.296l.8.598c.3-.399.6-.798.9-1.097zm9.9 9.87c-.3.298-.7.597-1.1.897l.6.797c.4-.299.9-.598 1.2-.997.4-.399.7-.797 1-1.196l-.8-.499c-.2.2-.5.599-.9.997z'
        fillRule='nonzero'
      />
    </svg>
  )
})

SvgKrOwnershipPending16.displayName = 'SvgKrOwnershipPending16'
export default withStyles(styles)(SvgKrOwnershipPending16)
