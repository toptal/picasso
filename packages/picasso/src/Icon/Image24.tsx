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
  name: 'PicassoSvgImage24',
})
const SvgImage24 = forwardRef(function SvgImage24(
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
      viewBox='0 0 24 24'
      fill='none'
      className={cx(...classNames)}
      style={svgStyle}
      ref={ref}
      data-testid={testId}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M0 2H24V21H0V2ZM1 3V20H23V3H1Z'
        fill='#455065'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M18.4417 6.81299L23.8124 11.1095L23.1877 11.8904L18.5583 8.18694L10.6191 17.1185L6.53593 15.0769L0.777356 18.916L0.222656 18.0839L6.46409 13.923L10.3809 15.8814L18.4417 6.81299Z'
        fill='#455065'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M8 7C6.89543 7 6 7.89543 6 9C6 10.1046 6.89543 11 8 11C9.10457 11 10 10.1046 10 9C10 7.89543 9.10457 7 8 7ZM5 9C5 7.34315 6.34315 6 8 6C9.65685 6 11 7.34315 11 9C11 10.6569 9.65685 12 8 12C6.34315 12 5 10.6569 5 9Z'
        fill='#455065'
      />
    </svg>
  )
})

SvgImage24.displayName = 'SvgImage24'
export default SvgImage24
