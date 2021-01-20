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
const useStyles = makeStyles(styles, { name: 'PicassoSvgCareer16' })
const SvgCareer16 = forwardRef(function SvgCareer16(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const { className, style = {}, color, scale, base } = props
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
    >
      <path d='M4 14v2H3v-2h1zm3-1v3H6v-3h1zm3-2v5H9v-5h1zm3-3v8h-1V8h1zm3-7.309V16h-1V5.809L10.382 3.5 16 .691zM4 0a3 3 0 011.777 5.418A3.994 3.994 0 017.995 8.8L8 9H7a3 3 0 00-5.995-.176L1 9H0a4 4 0 012.223-3.585A3 3 0 014 0zm0 1a2 2 0 100 4 2 2 0 000-4zm11 1.309L12.618 3.5 15 4.691V2.309z' />
    </svg>
  )
})

SvgCareer16.displayName = 'SvgCareer16'
export default SvgCareer16
