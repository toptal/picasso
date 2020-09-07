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
const SvgSpecializationDeveloper24 = forwardRef(
  function SvgSpecializationDeveloper24(props: Props, ref: Ref<SVGSVGElement>) {
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
          className='specializationDeveloper24_svg__cls-1'
          d='M39.5 31.5H.5v1a2 2 0 002 2h35a2 2 0 002-2zM3.5 29.5v-22a2 2 0 012-2h29a2 2 0 012 2v22'
        />
      </svg>
    )
  }
)

SvgSpecializationDeveloper24.displayName = 'SvgSpecializationDeveloper24'
export default withStyles(styles)(SvgSpecializationDeveloper24)
