import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgPartTime24',
})
const SvgPartTime24 = forwardRef(function SvgPartTime24(
  props: Props,
  ref: Ref<SVGSVGElement>
) {
  const {
    className,
    style = {},
    color,
    scale,
    base,
    'data-testid': testId,
  } = props
  const classes: Record<string, string> = useStyles(props)
  const classNames = [classes.root, className]
  const scaledSize = base || BASE_SIZE * Math.ceil(scale || 1)
  const colorClassName = kebabToCamelCase(`${color}`)

  if (classes[colorClassName]) {
    classNames.push(classes[colorClassName])
  }

  const svgStyle = {
    minWidth: `${scaledSize}px`,
    minHeight: `${scaledSize}px`,
    ...style,
  }

  return (
    <svg
      fill='none'
      viewBox='0 0 24 24'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M22 11.5c0 .168-.004.334-.012.5h-1A9.5 9.5 0 1 0 12 20.987v1.001c-.167.008-.333.012-.501.012C5.701 22 1 17.299 1 11.5S5.701 1 11.5 1 22 5.701 22 11.5ZM12 11v1H6v-1h5V4h1v7Zm3.278 8v-.721h-2.072l.422-.327c1.006-.8 1.622-1.49 1.622-2.249 0-.931-.791-1.442-1.694-1.442-.651 0-1.309.252-1.722.749l.476.539c.294-.336.714-.56 1.26-.56.427 0 .847.224.847.714 0 .672-.707 1.281-2.52 2.653V19h3.381Zm2.59.084c1.309 0 1.869-1.239 1.869-2.415s-.56-2.408-1.869-2.408-1.869 1.232-1.869 2.408.56 2.415 1.869 2.415Zm-1.036-2.415c0 .889.273 1.687 1.036 1.687s1.036-.798 1.036-1.687-.273-1.68-1.036-1.68-1.036.791-1.036 1.68ZM23.524 19h-.735v-2.128c0-.525-.273-.686-.686-.686-.371 0-.693.224-.868.455V19H20.5v-4.669h.735v1.75a1.616 1.616 0 0 1 1.197-.546c.728 0 1.092.378 1.092 1.071V19Z'
        fill='currentColor'
      />
    </svg>
  )
})

SvgPartTime24.displayName = 'SvgPartTime24'
export default SvgPartTime24
