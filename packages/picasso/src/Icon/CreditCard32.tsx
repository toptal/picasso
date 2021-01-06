import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { JssProps, StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 32

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps, JssProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, { name: 'PicassoSvgCreditCard32' })
const SvgCreditCard32 = forwardRef(function SvgCreditCard32(
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
      viewBox='0 0 32 32'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M31 10V7a1 1 0 00-1-1H2a1 1 0 00-1 1v3h30zm0 1H1v14a1 1 0 001 1h28a1 1 0 001-1V11zM2 5h28a2 2 0 012 2v18a2 2 0 01-2 2H2a2 2 0 01-2-2V7a2 2 0 012-2zm2 11h10v1H4v-1zm0 4h5v1H4v-1zm19-4h5v1h-5v-1z' />
    </svg>
  )
})

SvgCreditCard32.displayName = 'SvgCreditCard32'
export default SvgCreditCard32
