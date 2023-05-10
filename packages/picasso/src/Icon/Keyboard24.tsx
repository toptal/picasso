import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import type { StandardProps } from '@toptal/picasso-shared'

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
  name: 'PicassoSvgKeyboard24',
})
const SvgKeyboard24 = forwardRef(function SvgKeyboard24(
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
      fill='none'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M0 5v14h24l-1-1H1V6L0 5Zm0 0h24v14l-1-1V6H1L0 5Zm5 3H3v2h2V8Zm3 0H6v2h2V8Zm3 0H9v2h2V8Zm3 0h-2v2h2V8Zm3 0h-2v2h2V8Zm4 0h-3v2h3V8ZM9 11H7v2h2v-2Zm-3 0H3v2h3v-2Zm6 0h-2v2h2v-2Zm3 0h-2v2h2v-2Zm3 0h-2v2h2v-2Zm3 0h-2v2h2v-2ZM5 14H3v2h2v-2Zm9 0H6v2h8v-2Zm3 0h-2v2h2v-2Zm4 0h-3v2h3v-2Z' />
    </svg>
  )
})

SvgKeyboard24.displayName = 'SvgKeyboard24'
export default SvgKeyboard24
