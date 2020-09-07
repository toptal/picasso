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
const SvgSpecializationMagentoDeveloper24 = forwardRef(
  function SvgSpecializationMagentoDeveloper24(
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
        <path
          className='specializationMagentoDeveloper24_svg__cls-1'
          d='M19.838 0L2.5 10.008v19.989l4.949 2.861-.035-19.994 12.389-7.15 12.388 7.15v19.985l4.949-2.852V9.99L19.838 0z'
        />
      </svg>
    )
  }
)

SvgSpecializationMagentoDeveloper24.displayName =
  'SvgSpecializationMagentoDeveloper24'
export default withStyles(styles)(SvgSpecializationMagentoDeveloper24)
