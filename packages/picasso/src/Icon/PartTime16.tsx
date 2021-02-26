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
const useStyles = makeStyles(styles, { name: 'PicassoSvgPartTime16' })
const SvgPartTime16 = forwardRef(function SvgPartTime16(
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
      <path d='M7.5 0a7.5 7.5 0 017.484 8H13.98a6.5 6.5 0 10-5.98 5.98v1.004A7.5 7.5 0 117.5 0zm4.12 9.615c.935 0 1.335.88 1.335 1.72s-.4 1.725-1.335 1.725c-.935 0-1.335-.885-1.335-1.725 0-.84.4-1.72 1.335-1.72zm-3.08 0c.645 0 1.21.365 1.21 1.03 0 .533-.424 1.017-1.12 1.576l-.34.264h1.48V13H7.355v-.46c1.295-.98 1.8-1.415 1.8-1.895 0-.35-.3-.51-.605-.51-.39 0-.69.16-.9.4l-.34-.385c.295-.355.765-.535 1.23-.535zm5.485.05v1.25c.16-.19.475-.39.855-.39.52 0 .78.27.78.765V13h-.525v-1.52c0-.375-.195-.49-.49-.49a.811.811 0 00-.62.325V13H13.5V9.665h.525zm-2.405.47c-.545 0-.74.565-.74 1.2s.195 1.205.74 1.205c.545 0 .74-.57.74-1.205 0-.635-.195-1.2-.74-1.2zM8 2v6H4V7h3V2h1z' />
    </svg>
  )
})

SvgPartTime16.displayName = 'SvgPartTime16'
export default SvgPartTime16
