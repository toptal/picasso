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
const useStyles = makeStyles(styles, { name: 'PicassoSvgLink16' })
const SvgLink16 = forwardRef(function SvgLink16(
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
      viewBox='0 0 16 16'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M3 10a3 3 0 01-3-3V6a3 3 0 013-3h5a3 3 0 013 3h2a3 3 0 013 3v1a3 3 0 01-3 3H8a3 3 0 01-3-3H3zm10-3h-2a3 3 0 01-3 3H6a2 2 0 002 2h5a2 2 0 002-2V9a2 2 0 00-2-2zM8 4H3a2 2 0 00-2 2v1a2 2 0 002 2h2a3 3 0 013-3h2a2 2 0 00-2-2zm2 3H8a2 2 0 00-2 2h2a2 2 0 002-2z' />
    </svg>
  )
})

SvgLink16.displayName = 'SvgLink16'
export default SvgLink16
