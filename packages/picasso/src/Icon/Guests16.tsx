import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
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
const useStyles = makeStyles(styles, { name: 'PicassoSvgGuests16' })
const SvgGuests16 = forwardRef(function SvgGuests16(
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
      <path d='M4 1v1H3v13h10V2h-1V1h2v15H2V1h2zm6 11v1H6v-1h4zM8 5a2 2 0 011.452 3.375 2.998 2.998 0 011.542 2.427L11 11h-1a2 2 0 00-3.995-.15L6 11H5a3 3 0 011.549-2.626A2 2 0 018 5zm0 1a1 1 0 100 2 1 1 0 000-2zm3-6v3H5V0h6zm-1 1H6v1h4V1z' />
    </svg>
  )
})

SvgGuests16.displayName = 'SvgGuests16'
export default SvgGuests16
