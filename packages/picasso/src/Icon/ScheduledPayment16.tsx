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
const useStyles = makeStyles(styles, { name: 'PicassoSvgScheduledPayment16' })
const SvgScheduledPayment16 = forwardRef(function SvgScheduledPayment16(
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
      xmlnsXlink='http://www.w3.org/1999/xlink'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M13 7v1.072c.818.08 1.498.383 2.04.908l-.67.87A2.517 2.517 0 0013 9.138L13 10.862l.113.03c.184.05.369.109.553.173.277.097.528.215.755.355.227.14.412.333.555.58.143.247.215.54.215.88 0 .6-.217 1.093-.65 1.48-.364.325-.877.514-1.539.565L13 16h-1l-.001-1.096c-.862-.107-1.561-.448-2.099-1.024l.65-.9c.415.444.898.727 1.449.85V11.87a15.372 15.372 0 01-.514-.151 2.208 2.208 0 01-.975-.61c-.267-.287-.4-.657-.4-1.11 0-.56.225-1.025.675-1.395a2.44 2.44 0 011.214-.516L12 7h1zM4 0v1h8V0h1v1h3v6h-1V5H1v8h7v1H0V1h3V0h1zm9.001 12.13v1.75c.28-.036.501-.119.664-.25.223-.18.335-.393.335-.64 0-.253-.133-.455-.4-.605a3.191 3.191 0 00-.599-.255zm-1.002-2.99a1.087 1.087 0 00-.384.175.714.714 0 00-.305.605c0 .167.072.307.215.42.126.1.283.182.473.248V9.14zM3 2H1v2h14V2h-2v1h-1V2H4v1H3V2z' />
    </svg>
  )
})

SvgScheduledPayment16.displayName = 'SvgScheduledPayment16'
export default SvgScheduledPayment16
