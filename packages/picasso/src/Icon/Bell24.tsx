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
const useStyles = makeStyles(styles, { name: 'PicassoSvgBell24' })
const SvgBell24 = forwardRef(function SvgBell24(
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
      viewBox='0 0 24 24'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M12 2.014a8.5 8.5 0 018 8.486V18a1 1 0 001 1v1H2v-1a1 1 0 001-1v-7.5a8.5 8.5 0 018-8.486V0h1v2.014zM19 18v-7.5a7.5 7.5 0 00-15 0V18c0 .364-.097.706-.268 1h15.536A1.99 1.99 0 0119 18zM9 21.5V21h1v.5a1.5 1.5 0 003 0V21h1v.5a2.5 2.5 0 11-5 0z' />
    </svg>
  )
})

SvgBell24.displayName = 'SvgBell24'
export default SvgBell24
