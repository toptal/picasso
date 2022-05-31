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
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgProfileCrossed24',
})
const SvgProfileCrossed24 = forwardRef(function SvgProfileCrossed24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    className,
    style = {},
    color,
    scale,
    base,
    'data-testid': testId,
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
    ...style,
  }

  return (
    <svg
      viewBox='0 0 24 24'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M18.951 7.17a7.002 7.002 0 0 1-4.189 7.263 9.001 9.001 0 0 1 6.234 8.288L21 23h-1a8 8 0 0 0-8.933-7.946l1.057-1.057.1-.001A6 6 0 0 0 18 8.124l.952-.953ZM4.054 22.069a8.063 8.063 0 0 0-.05.683L4 23h-.878l.932-.932ZM21.5 1.793l.707.707L2.5 22.207l-.707-.707L21.5 1.793ZM12 1a6.993 6.993 0 0 1 5.8 3.08l-.722.722a6 6 0 1 0-8.275 8.276l-.722.722A7 7 0 0 1 12 1Z' />
    </svg>
  )
})

SvgProfileCrossed24.displayName = 'SvgProfileCrossed24'
export default SvgProfileCrossed24
