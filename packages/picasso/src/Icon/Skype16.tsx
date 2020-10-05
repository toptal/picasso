import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
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
const SvgSkype16 = forwardRef(function SvgSkype16(
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
      viewBox='0 0 16 16'
      className={cx(...classes)}
      style={svgStyle}
      ref={ref}
    >
      <path d='M15.353 9.796a4.009 4.009 0 01-.536 5.027 4.05 4.05 0 01-5.078.512A7.598 7.598 0 012.656 13.3a7.52 7.52 0 01-1.99-7.066 4.009 4.009 0 01.517-5.056A4.05 4.05 0 016.26.664a7.598 7.598 0 017.09 2.008 7.52 7.52 0 012.003 7.124zm-1.222.023l.247-.246a6.52 6.52 0 00-1.734-6.192A6.598 6.598 0 006.29 1.687l-.234.063-.194-.145a3.05 3.05 0 00-3.972.28 3.009 3.009 0 00-.282 3.948l.148.196-.065.237a6.52 6.52 0 001.674 6.327 6.598 6.598 0 006.349 1.72l.233-.062.193.144a3.05 3.05 0 003.972-.28 3.009 3.009 0 00.282-3.948l-.262-.348zm-9.572.517l-.236-.44.881-.473.237.44c.371.694 1.141 1.138 1.989 1.137h1.695c.767 0 1.375-.568 1.375-1.25S9.892 8.5 9.125 8.5h-2.25a2.445 2.445 0 01-1.667-.647A2.193 2.193 0 014.5 6.25C4.5 5 5.57 4 6.875 4H8.57c1.21 0 2.322.64 2.87 1.664l.237.44-.881.473-.237-.44C10.188 5.442 9.418 4.998 8.57 5H6.875C6.108 5 5.5 5.568 5.5 6.25c0 .324.139.637.39.872.259.24.613.378.985.378h2.25c1.304 0 2.375 1 2.375 2.25S10.43 12 9.125 12H7.43c-1.21 0-2.322-.64-2.87-1.664z' />
    </svg>
  )
})

SvgSkype16.displayName = 'SvgSkype16'
export default withStyles(styles)(SvgSkype16)
