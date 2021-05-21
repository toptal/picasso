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
const useStyles = makeStyles(styles, { name: 'PicassoSvgAttachment16' })
const SvgAttachment16 = forwardRef(function SvgAttachment16 (
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
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M8.296 5.333a1.676 1.676 0 012.456 2.279l-.085.092-3.26 3.259-.592-.593 3.26-3.259a.838.838 0 00-1.113-1.25l-.073.065-4.445 4.444a2.095 2.095 0 002.863 3.058l.1-.095 5.037-5.037a3.352 3.352 0 00-4.62-4.856l-.12.116-3.852 3.851-.593-.592 3.852-3.852a4.19 4.19 0 016.052 5.795l-.126.13L8 13.927a2.933 2.933 0 01-4.259-4.031l.11-.117 4.445-4.445z' />
    </svg>
  )
})

SvgAttachment16.displayName = 'SvgAttachment16'
export default SvgAttachment16
