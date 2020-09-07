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
const SvgSpecializationUiDeveloper24 = forwardRef(
  function SvgSpecializationUiDeveloper24(
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
          className='specializationUIDeveloper24_svg__cls-1'
          d='M31.5 15.36V.5h-6v12.092M21.5 15.659V.5h-6v15.465a4.5 4.5 0 01-9 0V.5h-6v15.465A10.425 10.425 0 0012.592 26.33'
        />
      </svg>
    )
  }
)

SvgSpecializationUiDeveloper24.displayName = 'SvgSpecializationUiDeveloper24'
export default withStyles(styles)(SvgSpecializationUiDeveloper24)
