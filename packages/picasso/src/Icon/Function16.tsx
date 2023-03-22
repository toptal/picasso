import React, { forwardRef, Ref } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import styles from './styles'
const BASE_SIZE = 16

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgFunction16',
})
const SvgFunction16 = forwardRef(function SvgFunction16(
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
      viewBox='0 0 16 16'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8 0a2.667 2.667 0 0 0-.533 5.28v2.187H2.133v3.2H0V16h5.333v-5.333H3.2V8.533h9.6v2.134h-2.133V16H16v-5.333h-2.133v-3.2H8.533V5.28A2.668 2.668 0 0 0 8 0Zm0 4.267a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Zm-6.933 7.466h3.2v3.2h-3.2v-3.2Zm10.666 0h3.2v3.2h-3.2v-3.2Z'
        fill='currentColor'
      />
    </svg>
  )
})

SvgFunction16.displayName = 'SvgFunction16'
export default SvgFunction16
