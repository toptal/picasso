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
const SvgSpecializationDrupalDeveloper24 = forwardRef(
  function SvgSpecializationDrupalDeveloper24(
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
          className='specializationDrupalDeveloper24_svg__cls-1'
          d='M18.982 24.647a6.155 6.155 0 106.154 6.155 6.155 6.155 0 00-6.154-6.155zM32.158 18.024a8.128 8.128 0 01-5.523 5.449A10.591 10.591 0 0125.036 39.5a17.798 17.798 0 0011.157-10.003c2.6-6.392.18-11.205-3.885-15.567M19.684 15.681a4.708 4.708 0 104.71-4.707 4.709 4.709 0 00-4.71 4.707z'
        />
      </svg>
    )
  }
)

SvgSpecializationDrupalDeveloper24.displayName =
  'SvgSpecializationDrupalDeveloper24'
export default withStyles(styles)(SvgSpecializationDrupalDeveloper24)
