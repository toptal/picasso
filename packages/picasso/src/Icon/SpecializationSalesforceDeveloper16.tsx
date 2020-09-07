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
const SvgSpecializationSalesforceDeveloper16 = forwardRef(
  function SvgSpecializationSalesforceDeveloper16(
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
          className='specializationSalesforceDeveloper16_svg__cls-1'
          d='M16.646 9.055a7.009 7.009 0 015.072-2.178 7.082 7.082 0 016.17 3.658 8.528 8.528 0 013.489-.741 8.7 8.7 0 010 17.398 8.561 8.561 0 01-1.699-.17 6.304 6.304 0 01-8.26 2.594 7.192 7.192 0 01-13.37-.325 6.598 6.598 0 01-1.372.143 6.76 6.76 0 01-3.338-12.589 7.768 7.768 0 0113.308-7.79M10.946 19h18.108'
        />
      </svg>
    )
  }
)

SvgSpecializationSalesforceDeveloper16.displayName =
  'SvgSpecializationSalesforceDeveloper16'
export default withStyles(styles)(SvgSpecializationSalesforceDeveloper16)
