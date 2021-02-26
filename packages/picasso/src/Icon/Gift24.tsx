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
const useStyles = makeStyles(styles, { name: 'PicassoSvgGift24' })
const SvgGift24 = forwardRef(function SvgGift24(
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
      <path d='M17.03.33c.433.2.743.377.992.568.299.23.497.47.694.806.058.1.047.078.219.399.35.654.35 1.364.015 2.068l-.161.218L17.057 6H24v7.5h-1.6V24H1.6l-.001-10.5H0V6h6.965L5.233 4.389l-.129-.16c-.403-.67-.403-1.407-.016-2.126A4.161 4.161 0 016.993.329C7.508.09 8.186.09 9.065.27l.383.196L12.01 2.85 14.545.494c.604-.628 1.49-.628 2.485-.165zM11.2 13.5H3.199l.001 8.9h8v-8.9zm9.599 0H12.8v8.9h8l-.001-8.9zm-9.599-6H1.6V12h9.6V7.5zm11.2 0h-9.6V12h9.6V7.5zm-6.725-6.01L12.8 4.166V6h2.056l2.72-2.532c.101-.267.087-.493-.034-.717-.158-.294-.149-.277-.194-.355a1.154 1.154 0 00-.318-.38c-.144-.11-.36-.234-.697-.39-.438-.205-.59-.205-.658-.136zm-7.986.136A2.666 2.666 0 006.48 2.75c-.144.268-.16.48-.058.694L9.165 6H11.2V4.146L8.513 1.644c-.437-.073-.72-.067-.824-.018z' />
    </svg>
  )
})

SvgGift24.displayName = 'SvgGift24'
export default SvgGift24
