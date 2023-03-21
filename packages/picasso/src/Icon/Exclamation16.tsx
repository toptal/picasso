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
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgExclamation16'
})
const SvgExclamation16 = forwardRef(function SvgExclamation16(
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
      <path d='M7.5 15a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm0-1a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM7 3h1v6H7V3Zm0 8h1v1H7v-1Z' />
    </svg>
  )
})

SvgExclamation16.displayName = 'SvgExclamation16'
export default SvgExclamation16
