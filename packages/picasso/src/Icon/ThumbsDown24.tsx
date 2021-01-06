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
const useStyles = makeStyles(styles, { name: 'PicassoSvgThumbsDown24' })
const SvgThumbsDown24 = forwardRef(function SvgThumbsDown24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    className,
    style = {},
    color,
    scale,
    base,
    classes: externalClasses
  } = props
  const classes: Record<string, string> = useStyles({
    classes: externalClasses
  })
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
      <path d='M11.23 1c2.448-.001 3.9.495 6.356 1.487h3.943A1.48 1.48 0 0123 3.975v8.923a1.48 1.48 0 01-1.471 1.487h-3.605L13.3 22.25a1.464 1.464 0 01-1.742.674l-1.063-.359a2.544 2.544 0 01-1.643-3.025l.944-3.808-2.592.475c-2.398.44-4.696-1.167-5.132-3.592a4.51 4.51 0 010-1.596l.924-5.134C3.503 3.056 5.94 1 8.785 1h2.445zm0 1H8.785C6.427 2 4.402 3.708 3.979 6.062l-.924 5.134a3.51 3.51 0 000 1.242c.339 1.882 2.116 3.126 3.968 2.786l4.115-.755-.372 1.503-.944 3.809c-.194.783.24 1.584.991 1.837l1.063.358a.47.47 0 00.561-.232L17 13.982V3.329l-.141-.056C14.339 2.27 13.187 2 11.229 2zM18 13.385h3.529a.48.48 0 00.471-.487V3.975a.48.48 0 00-.471-.488H18v9.898z' />
    </svg>
  )
})

SvgThumbsDown24.displayName = 'SvgThumbsDown24'
export default SvgThumbsDown24
