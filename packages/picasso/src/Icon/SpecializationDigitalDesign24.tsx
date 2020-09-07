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
const SvgSpecializationDigitalDesign24 = forwardRef(
  function SvgSpecializationDigitalDesign24(
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
          className='specializationDigitalDesign24_svg__cls-1'
          d='M26.5 29.5v4M13.5 33.5v-4M37.5 25.5h-35M15.5 10h-8M19.5 14h-12M15.5 18h-8M24.5 21v-6.533L28.5 7l4 7.467V21M28.5 21v-6.533'
        />
      </svg>
    )
  }
)

SvgSpecializationDigitalDesign24.displayName =
  'SvgSpecializationDigitalDesign24'
export default withStyles(styles)(SvgSpecializationDigitalDesign24)
