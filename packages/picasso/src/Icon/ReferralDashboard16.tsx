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
  name: 'PicassoSvgReferralDashboard16',
})
const SvgReferralDashboard16 = forwardRef(function SvgReferralDashboard16(
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
      <path d='M12 7a3 3 0 0 1 1.777 5.418 3.994 3.994 0 0 1 2.218 3.382L16 16h-1a3 3 0 0 0-5.995-.176L9 16H8a4 4 0 0 1 2.223-3.585A3 3 0 0 1 12 7ZM1.444 10.459a7.015 7.015 0 0 0 4.858 4.334l-.243.97a8.017 8.017 0 0 1-5.551-4.952l.936-.352ZM12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM4 0a3 3 0 0 1 1.777 5.418A3.994 3.994 0 0 1 7.995 8.8L8 9H7a3 3 0 0 0-5.995-.176L1 9H0a4 4 0 0 1 2.223-3.585A3 3 0 0 1 4 0Zm4 0a8.001 8.001 0 0 1 7.94 7.008l-.993.124A7.001 7.001 0 0 0 8 1V0ZM4 1a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z' />
    </svg>
  )
})

SvgReferralDashboard16.displayName = 'SvgReferralDashboard16'
export default SvgReferralDashboard16
