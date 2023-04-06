import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import type { StandardProps } from '@toptal/picasso-shared'

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
  name: 'PicassoSvgPhone16',
})
const SvgPhone16 = forwardRef(function SvgPhone16(
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
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path d='M14.275 15.277a2.456 2.456 0 0 1-2.691.531A21.21 21.21 0 0 1 .192 4.421a2.462 2.462 0 0 1 .53-2.694L2.106.34a1.156 1.156 0 0 1 1.637 0l2.33 2.325a1.159 1.159 0 0 1 0 1.639L5.07 5.309l.158.218a23.35 23.35 0 0 0 5.247 5.247l.215.157 1.004-1.005a1.156 1.156 0 0 1 1.637 0l2.33 2.326a1.159 1.159 0 0 1 0 1.638l-1.386 1.387ZM1.115 4.035c2.047 4.9 5.949 8.8 10.856 10.85.548.231 1.177.106 1.597-.314l1.385-1.388a.158.158 0 0 0 0-.224l-2.329-2.326a.156.156 0 0 0-.223 0l-1.306 1.308a.5.5 0 0 1-.649.05l-.558-.408a24.343 24.343 0 0 1-5.47-5.469l-.408-.561a.5.5 0 0 1 .05-.648l1.306-1.308a.158.158 0 0 0 0-.224L3.038 1.047a.156.156 0 0 0-.222 0L1.429 2.434a1.462 1.462 0 0 0-.315 1.601Z' />
    </svg>
  )
})

SvgPhone16.displayName = 'SvgPhone16'
export default SvgPhone16
