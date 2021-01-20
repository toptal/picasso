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
const useStyles = makeStyles(styles, { name: 'PicassoSvgCareer24' })
const SvgCareer24 = forwardRef(function SvgCareer24(
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
      viewBox='0 0 24 24'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M7 21v2H6v-2h1zm4-2v4h-1v-4h1zm4-3v7h-1v-7h1zm4-3v10h-1V13h1zm4-11.309V23h-1V8.809L15.382 5.5 23 1.691zM6.5 1a4.5 4.5 0 012.168 8.444 5.5 5.5 0 013.328 4.835L12 14.5h-1a4.5 4.5 0 00-8.995-.212L2 14.5H1a5.501 5.501 0 013.333-5.057A4.5 4.5 0 016.5 1zm0 1a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM22 3.309L17.618 5.5 22 7.691V3.309z' />
    </svg>
  )
})

SvgCareer24.displayName = 'SvgCareer24'
export default SvgCareer24
