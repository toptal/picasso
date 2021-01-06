import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { JssProps, StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps, JssProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, { name: 'PicassoSvgProfileCrossed16' })
const SvgProfileCrossed16 = forwardRef(function SvgProfileCrossed16(
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
      viewBox='0 0 16 16'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M12.997 5.126L13 5a5 5 0 01-2.64 4.41 7 7 0 014.635 6.315L15 16h-1a6 6 0 00-5.878-5.999l1.242-1.24a4.012 4.012 0 002.398-2.397l1.235-1.238zM14.5.793l.707.707L1.5 15.207.793 14.5 14.5.793zM8 0c1.605 0 3.034.757 3.95 1.933l-.715.714a4 4 0 10-5.588 5.588l-.713.714A5 5 0 018 0z' />
    </svg>
  )
})

SvgProfileCrossed16.displayName = 'SvgProfileCrossed16'
export default SvgProfileCrossed16
