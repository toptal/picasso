/* eslint-disable import/no-extraneous-dependencies */
import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import type { StandardProps } from '@toptal/picasso-shared'
import kebabToCamelCase from '@toptal/picasso-utils/kebab-to-camel-case'

import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgCareer24',
})
const SvgCareer24 = forwardRef(function SvgCareer24(
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
      <path d='M7 21v2H6v-2h1zm4-2v4h-1v-4h1zm4-3v7h-1v-7h1zm4-3v10h-1V13h1zm4-11.309V23h-1V8.809L15.382 5.5 23 1.691zM6.5 1a4.5 4.5 0 0 1 2.168 8.444 5.5 5.5 0 0 1 3.328 4.835L12 14.5h-1a4.5 4.5 0 0 0-8.995-.212L2 14.5H1a5.501 5.501 0 0 1 3.333-5.057A4.5 4.5 0 0 1 6.5 1zm0 1a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM22 3.309 17.618 5.5 22 7.691V3.309z' />
    </svg>
  )
})

SvgCareer24.displayName = 'SvgCareer24'
export default SvgCareer24
