import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType;
  color?: string;
  base?: number;
}
const SvgLanguage24 = forwardRef(function SvgLanguage24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    classes: availableClasses,
    className,
    style = {},
    color,
    scale,
    base
  } = props
  const classes = [availableClasses.root, className]
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const colorClassName = kebabToCamelCase(`${color}`)

  if (availableClasses[colorClassName]) {
    classes.push(availableClasses[colorClassName])
  }

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style
  }

  return (
    <svg
      viewBox='0 0 24 24'
      className={cx(...classes)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M8 18l-5 5v-5H1V1h22v17H8zm-4 2.586L7.586 17H22V2H2v15h2v3.586zM16.437 14h-1.235l-.767-1.924h-4.316L9.352 14H8.117l3.484-8.671h1.339L16.437 14zm-2.327-2.886l-1.833-4.667-1.846 4.667h3.679z' />
    </svg>
  )
})

SvgLanguage24.displayName = 'SvgLanguage24'
export default withStyles(styles)(SvgLanguage24)
