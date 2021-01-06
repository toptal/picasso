import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { JssProps, StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps, JssProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, { name: 'PicassoSvgDispute24' })
const SvgDispute24 = forwardRef(function SvgDispute24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const { className, style = {}, color, scale, base } = props
  const classes: Record<string, string> = useStyles()
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
    >
      <path d='M8.5.793L15.207 7.5l-.707.707-.5-.5-2.793 2.793 1.147 1.147L13 11l10 10-2 2-10-10 .647-.646-1.147-1.147L7.707 14l.5.5-.707.707L.793 8.5l.707-.707.5.5L8.293 2l-.5-.5L8.5.793zM13 12.415l-.585.585L21 21.585l.585-.585L13 12.415zM9 2.707L2.707 9 7 13.293 13.293 7 9 2.707z' />
    </svg>
  )
})

SvgDispute24.displayName = 'SvgDispute24'
export default SvgDispute24
