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
const SvgSpecializationWordPress24 = forwardRef(
  function SvgSpecializationWordPress24(props: Props, ref: Ref<SVGSVGElement>) {
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
          className='specializationWordPress24_svg__cls-1'
          d='M5.001 20a15.003 15.003 0 008.454 13.5L6.3 13.895A14.944 14.944 0 005.001 20zM30.128 19.243a7.897 7.897 0 00-1.237-4.137 7.021 7.021 0 01-1.473-3.518 2.598 2.598 0 012.519-2.662c.066 0 .13.008.194.012A14.997 14.997 0 007.468 11.76c.352.01.684.018.966.018 1.569 0 3.997-.19 3.997-.19a.62.62 0 01.097 1.236s-.813.095-1.717.143l5.462 16.248'
        />
      </svg>
    )
  }
)

SvgSpecializationWordPress24.displayName = 'SvgSpecializationWordPress24'
export default withStyles(styles)(SvgSpecializationWordPress24)
