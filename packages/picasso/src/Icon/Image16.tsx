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
  name: 'PicassoSvgImage16',
})
const SvgImage16 = forwardRef(function SvgImage16(
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
      viewBox='0 0 16 16'
      fill='none'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <g fill='#455065' fill-rule='evenodd' clip-rule='evenodd'>
        <path d='M0 1h16v13H0V1Zm1 1v11h14V2H1Z' />
        <path d='m12.5 3.793 3.354 3.354-.708.707L12.5 5.207l-5.901 5.901-2.046-1.023L.8 12.9l-.6-.8 4.247-3.185 1.954.977L12.5 3.793Z' />
        <path d='M5 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM3 6a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z' />
      </g>
    </svg>
  )
})

SvgImage16.displayName = 'SvgImage16'
export default SvgImage16
