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
  name: 'PicassoSvgSubfunction16',
})
const SvgSubfunction16 = forwardRef(function SvgSubfunction16(
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
        d='M5.333 0h5.334v5.333H8.533v2.134h5.334v3.253a2.668 2.668 0 1 1-1.067 0V8.533H3.2v2.134h2.133V16H0v-5.333h2.133v-3.2h5.334V5.333H5.333V0Zm7.984 11.733a1.6 1.6 0 1 0 .033 0h-.033Zm-11.184 0H1.067v3.2h3.2v-3.2H2.133Zm5.334-7.466H9.6v-3.2H6.4v3.2h1.067Z'
        fill='currentColor'
      />
    </svg>
  )
})

SvgSubfunction16.displayName = 'SvgSubfunction16'
export default SvgSubfunction16
