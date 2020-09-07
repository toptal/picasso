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
const SvgSpecializationRemoteTechConsulting24 = forwardRef(
  function SvgSpecializationRemoteTechConsulting24(
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
          className='specializationRemoteTechConsulting24_svg__cls-1'
          d='M24.754 34.947a10.428 10.428 0 0114.747 0M27.031 37.223a7.21 7.21 0 0110.193 0M29.309 39.5a3.99 3.99 0 015.638 0M8.098 9.886h9.87v6.624M20.75 4.454v10.135h3.312v4.703M26.579 6.839v10.665h4.902M29.891 24.856H19.757v5.366M16.444 31.547v-5.3H7.966M4.521 18.365h7.022v4.438h5.034M4.654 14.191h6.16'
        />
      </svg>
    )
  }
)

SvgSpecializationRemoteTechConsulting24.displayName =
  'SvgSpecializationRemoteTechConsulting24'
export default withStyles(styles)(SvgSpecializationRemoteTechConsulting24)
