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
const useStyles = makeStyles(styles, { name: 'PicassoSvgUnlink16' })
const SvgUnlink16 = forwardRef(function SvgUnlink16(
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
      <path d='M13.5 1.793l.707.707L2.5 14.207l-.707-.707L13.5 1.793zM13 6a3 3 0 013 3v1a3 3 0 01-3 3H8a2.99 2.99 0 01-2.06-.818l.708-.708C7.004 11.8 7.478 12 8 12h5a2 2 0 002-2V9a2 2 0 00-2-2h-1.879l1-1H13zM8 3a2.99 2.99 0 012.06.82l-.708.706A1.993 1.993 0 008 4H3a2 2 0 00-2 2v1a2 2 0 002 2h1.878l-1 1H3a3 3 0 01-3-3V6a3 3 0 013-3h5zm2.996 4.126L11 7a3 3 0 01-2.875 2.997l2.871-2.871zM7.874 6.003l-2.87 2.871.001-.05a3 3 0 012.87-2.821z' />
    </svg>
  )
})

SvgUnlink16.displayName = 'SvgUnlink16'
export default SvgUnlink16
