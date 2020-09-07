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
const SvgSpecializationRemoteOpsConsulting16 = forwardRef(
  function SvgSpecializationRemoteOpsConsulting16(
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
          className='specializationRemoteOpsConsulting16_svg__cls-1'
          d='M20 27.017l-5.711 5.711a8.077 8.077 0 01-11.423 0 8.077 8.077 0 010-11.423 8.077 8.077 0 0111.423 0l3.346 3.347M20 27.017l5.711-5.712a8.077 8.077 0 0111.423 0 8.077 8.077 0 010 11.423 8.077 8.077 0 01-11.423 0l-3.346-3.346M9.17 9.392a15.315 15.315 0 0121.66 0M12.515 12.736a10.588 10.588 0 0114.97 0M15.86 16.08a5.859 5.859 0 018.281 0'
        />
      </svg>
    )
  }
)

SvgSpecializationRemoteOpsConsulting16.displayName =
  'SvgSpecializationRemoteOpsConsulting16'
export default withStyles(styles)(SvgSpecializationRemoteOpsConsulting16)
