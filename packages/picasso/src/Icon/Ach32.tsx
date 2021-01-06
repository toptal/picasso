import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 32

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, { name: 'PicassoSvgAch32' })
const SvgAch32 = forwardRef(function SvgAch32(
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
      viewBox='0 0 32 32'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M25 12v-1h5a2 2 0 012 2v14a2 2 0 01-2 2H2a2 2 0 01-2-2V13a2 2 0 012-2h6v1H2a1 1 0 00-1 1v14a1 1 0 001 1h28a1 1 0 001-1V13a1 1 0 00-1-1h-5zM14 24h14v1H14v-1zm4-4h10v1H18v-1zm-.5-13.793L5 18.707V23h4.293l12.5-12.5L17.5 6.207zm.707-.707L22.5 9.793 24.793 7.5 20.5 3.207 18.207 5.5zM4 18.293l16.5-16.5L26.207 7.5 9.707 24H4v-5.707z' />
    </svg>
  )
})

SvgAch32.displayName = 'SvgAch32'
export default SvgAch32
