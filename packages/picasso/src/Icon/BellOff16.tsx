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
const useStyles = makeStyles(styles, { name: 'PicassoSvgBellOff16' })
const SvgBellOff16 = forwardRef(function SvgBellOff16(
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
      <path d='M6 13v.5a1.5 1.5 0 003 0V13h1v.5a2.5 2.5 0 11-5 0v-.379L5.12 13H6zM14.5.793l.707.707L1.5 15.207.793 14.5 14.5.793zM8 0v1.022c1.29.117 2.45.678 3.329 1.53l-.707.707A4.5 4.5 0 003 6.5v3.505c0 .383-.066.716-.192.995h.07l-1 1H.999v-1C1.724 11 2 10.725 2 10.005V6.5a5.5 5.5 0 015-5.478V0h1zm5 6.5v3.505c0 .72.276.995 1 .995v1H6.12l1-1h5.072a2.397 2.397 0 01-.192-.995V6.5c0-.122-.005-.243-.014-.363l.874-.875c.092.398.14.812.14 1.238z' />
    </svg>
  )
})

SvgBellOff16.displayName = 'SvgBellOff16'
export default SvgBellOff16
