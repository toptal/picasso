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
const useStyles = makeStyles(styles, { name: 'PicassoSvgTimeConvert16' })
const SvgTimeConvert16 = forwardRef(function SvgTimeConvert16 (
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
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 16 16'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M16 12a4 4 0 01-7 2.647V16H8v-3h3v1H9.764a3 3 0 005.23-1.825L15 12h1zM7.5 0a7.5 7.5 0 017.484 7H13.98A6.5 6.5 0 107 13.981v1.003A7.5 7.5 0 017.5 0zM16 8v3h-3v-1h1.236a3 3 0 00-5.231 1.824L9 12H8a4 4 0 017.002-2.645L15 8h1zM8 2v6H4V7h3V2h1z' />
    </svg>
  )
})

SvgTimeConvert16.displayName = 'SvgTimeConvert16'
export default SvgTimeConvert16
