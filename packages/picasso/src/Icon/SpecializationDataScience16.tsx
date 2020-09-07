import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType;
  color?: string;
  base?: number;
}
const SvgSpecializationDataScience16 = forwardRef(
  function SvgSpecializationDataScience16(
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
        <path
          className='specializationDataScience16_svg__cls-1'
          d='M24 20c0 .552-1.79 1-4 1s-4-.448-4-1'
        />
      </svg>
    )
  }
)

SvgSpecializationDataScience16.displayName = 'SvgSpecializationDataScience16'
export default withStyles(styles)(SvgSpecializationDataScience16)
