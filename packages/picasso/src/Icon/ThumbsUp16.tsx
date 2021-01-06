import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { JssProps, StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps, JssProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, { name: 'PicassoSvgThumbsUp16' })
const SvgThumbsUp16 = forwardRef(function SvgThumbsUp16(
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
      viewBox='0 0 16 16'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M8.778.26L9.5.5a1.707 1.707 0 011.117 2.034l-.642 2.56 1.762-.319a3 3 0 013.488 3.488l-.628 3.453A4 4 0 0110.662 15H9c-1.664 0-3.33-.333-5-1H2a1 1 0 01-1-1V7a1 1 0 011-1h2.45L7.593.712A1 1 0 018.778.259zm-.316.948l-.01.015L5.02 7 5 6.999v6.307c1.341.464 2.673.695 4 .694h1.662a3 3 0 002.951-2.463l.628-3.452a2 2 0 00-2.326-2.326l-3.287.596.377-1.503.641-2.56a.707.707 0 00-.462-.843l-.722-.241zM4 13V6.999L2 7v6h2z' />
    </svg>
  )
})

SvgThumbsUp16.displayName = 'SvgThumbsUp16'
export default SvgThumbsUp16
