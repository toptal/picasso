import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, { name: 'PicassoSvgBellOff24' })
const SvgBellOff24 = forwardRef(function SvgBellOff24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    className,
    style = {},
    color,
    scale,
    base,
    'data-testid': testId
  } = props
  const classes: Record<string, string> = useStyles(props)
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
      data-testid={testId}
    >
      <path d='M10 21v.5a1.5 1.5 0 003 0V21h1v.5a2.5 2.5 0 11-5 0V21h1zM21.5 1.793l.707.707L2.5 22.207l-.707-.707L21.5 1.793zM20 10.5V18a1 1 0 001 1v1H6.12l1-1h12.148A1.99 1.99 0 0119 18v-7.5c0-1-.196-1.954-.55-2.826l.759-.76A8.468 8.468 0 0120 10.5zM12 0v2.014a8.471 8.471 0 015.45 2.415l-.708.707A7.5 7.5 0 004 10.5v7.378l-2 2V19a1 1 0 001-1v-7.5a8.5 8.5 0 018-8.486V0h1z' />
    </svg>
  )
})

SvgBellOff24.displayName = 'SvgBellOff24'
export default SvgBellOff24
