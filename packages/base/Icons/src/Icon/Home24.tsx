import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import type { StandardProps } from '@toptal/picasso-shared'
import { kebabToCamelCase } from '@toptal/picasso-utils'

import styles from './styles'
const BASE_SIZE = 24

type ScaleType = 1 | 2 | 3 | 4
export interface Props extends StandardProps {
  scale?: ScaleType
  color?: string
  base?: number
}
const useStyles = makeStyles(styles, {
  name: 'PicassoSvgHome24',
})
const SvgHome24 = forwardRef(function SvgHome24(
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
        d='M.5 0H0v11h14V0H.5ZM1 10V1h12v9H1ZM17.5 0H17v11h7V0h-6.5Zm.5 10V1h5v9h-5Zm6 14H10V14h14v10Zm-1-1v-8H11v8h12ZM6.5 24H7V14H0v10h6.5ZM6 15v8H1v-8h5Z'
        clipRule='evenodd'
      />
    </svg>
  )
})

SvgHome24.displayName = 'SvgHome24'
export default SvgHome24
