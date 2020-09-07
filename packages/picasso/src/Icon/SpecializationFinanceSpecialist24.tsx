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
const SvgSpecializationFinanceSpecialist24 = forwardRef(
  function SvgSpecializationFinanceSpecialist24(
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
          className='specializationFinanceSpecialist24_svg__cls-1'
          d='M18.452 35.786V9.167h-6.19v26.619M7.929 35.786V17.833H1.738v17.953M.5 39.5h22.905M22.786 23.915V.5h6.19v19.395'
        />
      </svg>
    )
  }
)

SvgSpecializationFinanceSpecialist24.displayName =
  'SvgSpecializationFinanceSpecialist24'
export default withStyles(styles)(SvgSpecializationFinanceSpecialist24)
